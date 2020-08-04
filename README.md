# ember-intersection-observer-modifier

Use [`IntersectionObserver`][intersection-observer] through an Ember Modifier

## Compatibility

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Installation

```
ember install ember-intersection-observer-modifier
```

## Usage

This addon provides an Ember [modifier][ember-modifier] for attaching a [`IntersectionObserver`][intersection-observer] to an element in your Ember template and calling an action when the observer fires.

In the following example, `this.onChange` will be called any time that the element changes size.

```handlebars
<div {{observe-intersection this.onChange}} />
```

Additional configuration options can also be passed as either an additional positional parameter, or as named parameters. You can read more about valid configuration options [here][intersection-observer-options].

```handlebars
<div {{ref this "scrollArea"}}>
  <div {{observe-intersection this.onChange (hash root=this.scrollArea) rootMargin="10px"}} />
</div>
```

_Note: the above `ref` modifier comes from [`ember-ref-modifier`][ember-ref-modifier]_

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

[intersection-observer]: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
[intersection-observer-options]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
[ember-modifier]: https://guides.emberjs.com/release/components/template-lifecycle-dom-and-modifiers/#toc_out-of-component-modifications
[ember-ref-modifier]: https://github.com/lifeart/ember-ref-modifier
