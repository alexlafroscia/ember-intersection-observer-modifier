import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { clearRender, find, render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import td from "testdouble";

module("Integration | Modifier | observe-intersection", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.callback = td.function();
    td.replace(window, "IntersectionObserver");
  });

  hooks.afterEach(function () {
    td.reset();
  });

  test("creating an `IntersectionObserver` for the modified element", async function (assert) {
    await render(hbs`
      <div data-test-element {{observe-intersection this.callback (hash foo="foo") bar="bar"}}></div>
    `);

    const modifiedElement = find("[data-test-element]");

    assert.verify(
      new IntersectionObserver(
        this.callback,
        td.matchers.contains({ foo: "foo", bar: "bar" })
      ),
      "Created the `IntersectionObserver` with the expected configuration"
    );

    assert.verify(
      IntersectionObserver.prototype.observe(modifiedElement),
      "Observes the modified element"
    );
  });

  test("re-creating the `IntersectionObserver` on argument change", async function (assert) {
    this.value = "foo";

    await render(hbs`
      <div data-test-element {{observe-intersection this.callback value=this.value}}></div>
    `);

    this.set("value", "bar");

    assert.verify(
      IntersectionObserver.prototype.disconnect(),
      "Cleans up the initial `IntersectionObserver` when the configuration is updated"
    );

    assert.verify(
      new IntersectionObserver(
        this.callback,
        td.matchers.contains({ value: "bar" })
      ),
      "Creates a new `IntersectionObserver` with the new configuration"
    );
  });

  test("cleaning up the `IntersectionObserver` when un-mounting the element", async function (assert) {
    await render(hbs`
      <div data-test-element {{observe-intersection}}></div>
    `);

    await clearRender();

    assert.verify(
      IntersectionObserver.prototype.disconnect(),
      "Cleans up the `IntersectionObserver` when element is destroyed"
    );
  });
});
