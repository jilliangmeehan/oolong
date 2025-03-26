(() => {
  // node_modules/svelte/src/version.js
  var PUBLIC_VERSION = "5";

  // node_modules/svelte/src/internal/disclose-version.js
  if (typeof window !== "undefined") {
    ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(PUBLIC_VERSION);
  }

  // node_modules/svelte/src/internal/flags/index.js
  var legacy_mode_flag = false;
  var tracing_mode_flag = false;
  function enable_legacy_mode_flag() {
    legacy_mode_flag = true;
  }

  // node_modules/svelte/src/internal/flags/legacy.js
  enable_legacy_mode_flag();

  // node_modules/svelte/src/constants.js
  var EACH_ITEM_REACTIVE = 1;
  var EACH_INDEX_REACTIVE = 1 << 1;
  var EACH_IS_CONTROLLED = 1 << 2;
  var EACH_IS_ANIMATED = 1 << 3;
  var EACH_ITEM_IMMUTABLE = 1 << 4;
  var PROPS_IS_IMMUTABLE = 1;
  var PROPS_IS_RUNES = 1 << 1;
  var PROPS_IS_UPDATED = 1 << 2;
  var PROPS_IS_BINDABLE = 1 << 3;
  var PROPS_IS_LAZY_INITIAL = 1 << 4;
  var TRANSITION_OUT = 1 << 1;
  var TRANSITION_GLOBAL = 1 << 2;
  var TEMPLATE_FRAGMENT = 1;
  var TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  var HYDRATION_START = "[";
  var HYDRATION_START_ELSE = "[!";
  var HYDRATION_END = "]";
  var HYDRATION_ERROR = {};
  var ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
  var UNINITIALIZED = Symbol();
  var FILENAME = Symbol("filename");
  var HMR = Symbol("hmr");
  var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";

  // node_modules/esm-env/dev-fallback.js
  var node_env = globalThis.process?.env?.NODE_ENV;
  var dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");

  // node_modules/svelte/src/internal/client/constants.js
  var DERIVED = 1 << 1;
  var EFFECT = 1 << 2;
  var RENDER_EFFECT = 1 << 3;
  var BLOCK_EFFECT = 1 << 4;
  var BRANCH_EFFECT = 1 << 5;
  var ROOT_EFFECT = 1 << 6;
  var BOUNDARY_EFFECT = 1 << 7;
  var UNOWNED = 1 << 8;
  var DISCONNECTED = 1 << 9;
  var CLEAN = 1 << 10;
  var DIRTY = 1 << 11;
  var MAYBE_DIRTY = 1 << 12;
  var INERT = 1 << 13;
  var DESTROYED = 1 << 14;
  var EFFECT_RAN = 1 << 15;
  var EFFECT_TRANSPARENT = 1 << 16;
  var LEGACY_DERIVED_PROP = 1 << 17;
  var INSPECT_EFFECT = 1 << 18;
  var HEAD_EFFECT = 1 << 19;
  var EFFECT_HAS_DERIVED = 1 << 20;
  var EFFECT_IS_UPDATING = 1 << 21;
  var STATE_SYMBOL = Symbol("$state");
  var STATE_SYMBOL_METADATA = Symbol("$state metadata");
  var LEGACY_PROPS = Symbol("legacy props");
  var LOADING_ATTR_SYMBOL = Symbol("");

  // node_modules/svelte/src/internal/shared/utils.js
  var is_array = Array.isArray;
  var index_of = Array.prototype.indexOf;
  var array_from = Array.from;
  var object_keys = Object.keys;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var get_descriptors = Object.getOwnPropertyDescriptors;
  var object_prototype = Object.prototype;
  var array_prototype = Array.prototype;
  var get_prototype_of = Object.getPrototypeOf;
  var is_extensible = Object.isExtensible;
  var noop = () => {
  };
  function run(fn) {
    return fn();
  }
  function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }

  // node_modules/svelte/src/internal/client/dom/task.js
  var micro_tasks = [];
  var idle_tasks = [];
  function run_micro_tasks() {
    var tasks = micro_tasks;
    micro_tasks = [];
    run_all(tasks);
  }
  function run_idle_tasks() {
    var tasks = idle_tasks;
    idle_tasks = [];
    run_all(tasks);
  }
  function queue_micro_task(fn) {
    if (micro_tasks.length === 0) {
      queueMicrotask(run_micro_tasks);
    }
    micro_tasks.push(fn);
  }
  function flush_tasks() {
    if (micro_tasks.length > 0) {
      run_micro_tasks();
    }
    if (idle_tasks.length > 0) {
      run_idle_tasks();
    }
  }

  // node_modules/svelte/src/internal/client/reactivity/equality.js
  function equals(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }

  // node_modules/svelte/src/internal/client/errors.js
  function component_api_changed(parent, method, component2) {
    if (dev_fallback_default) {
      const error = new Error(`component_api_changed
${parent} called \`${method}\` on an instance of ${component2}, which is no longer valid in Svelte 5
https://svelte.dev/e/component_api_changed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/component_api_changed`);
    }
  }
  function component_api_invalid_new(component2, name) {
    if (dev_fallback_default) {
      const error = new Error(`component_api_invalid_new
Attempted to instantiate ${component2} with \`new ${name}\`, which is no longer valid in Svelte 5. If this component is not under your control, set the \`compatibility.componentApi\` compiler option to \`4\` to keep it working.
https://svelte.dev/e/component_api_invalid_new`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/component_api_invalid_new`);
    }
  }
  function derived_references_self() {
    if (dev_fallback_default) {
      const error = new Error(`derived_references_self
A derived value cannot reference itself recursively
https://svelte.dev/e/derived_references_self`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/derived_references_self`);
    }
  }
  function each_key_duplicate(a, b, value) {
    if (dev_fallback_default) {
      const error = new Error(`each_key_duplicate
${value ? `Keyed each block has duplicate key \`${value}\` at indexes ${a} and ${b}` : `Keyed each block has duplicate key at indexes ${a} and ${b}`}
https://svelte.dev/e/each_key_duplicate`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/each_key_duplicate`);
    }
  }
  function effect_in_teardown(rune) {
    if (dev_fallback_default) {
      const error = new Error(`effect_in_teardown
\`${rune}\` cannot be used inside an effect cleanup function
https://svelte.dev/e/effect_in_teardown`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_in_teardown`);
    }
  }
  function effect_in_unowned_derived() {
    if (dev_fallback_default) {
      const error = new Error(`effect_in_unowned_derived
Effect cannot be created inside a \`$derived\` value that was not itself created inside an effect
https://svelte.dev/e/effect_in_unowned_derived`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
    }
  }
  function effect_orphan(rune) {
    if (dev_fallback_default) {
      const error = new Error(`effect_orphan
\`${rune}\` can only be used inside an effect (e.g. during component initialisation)
https://svelte.dev/e/effect_orphan`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_orphan`);
    }
  }
  function effect_update_depth_exceeded() {
    if (dev_fallback_default) {
      const error = new Error(`effect_update_depth_exceeded
Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops
https://svelte.dev/e/effect_update_depth_exceeded`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    }
  }
  function hydration_failed() {
    if (dev_fallback_default) {
      const error = new Error(`hydration_failed
Failed to hydrate the application
https://svelte.dev/e/hydration_failed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/hydration_failed`);
    }
  }
  function props_invalid_value(key) {
    if (dev_fallback_default) {
      const error = new Error(`props_invalid_value
Cannot do \`bind:${key}={undefined}\` when \`${key}\` has a fallback value
https://svelte.dev/e/props_invalid_value`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/props_invalid_value`);
    }
  }
  function rune_outside_svelte(rune) {
    if (dev_fallback_default) {
      const error = new Error(`rune_outside_svelte
The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
    }
  }
  function state_descriptors_fixed() {
    if (dev_fallback_default) {
      const error = new Error(`state_descriptors_fixed
Property descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.
https://svelte.dev/e/state_descriptors_fixed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
    }
  }
  function state_prototype_fixed() {
    if (dev_fallback_default) {
      const error = new Error(`state_prototype_fixed
Cannot set prototype of \`$state\` object
https://svelte.dev/e/state_prototype_fixed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
    }
  }
  function state_unsafe_mutation() {
    if (dev_fallback_default) {
      const error = new Error(`state_unsafe_mutation
Updating state inside a derived or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`
https://svelte.dev/e/state_unsafe_mutation`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
    }
  }

  // node_modules/svelte/src/internal/shared/warnings.js
  var bold = "font-weight: bold";
  var normal = "font-weight: normal";
  function state_snapshot_uncloneable(properties) {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] state_snapshot_uncloneable
%c${properties ? `The following properties cannot be cloned with \`$state.snapshot\` \u2014 the return value contains the originals:

${properties}` : "Value cannot be cloned with `$state.snapshot` \u2014 the original value was returned"}
https://svelte.dev/e/state_snapshot_uncloneable`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/state_snapshot_uncloneable`);
    }
  }

  // node_modules/svelte/src/internal/shared/clone.js
  var empty = [];
  function snapshot(value, skip_warning = false) {
    if (dev_fallback_default && !skip_warning) {
      const paths = [];
      const copy = clone(value, /* @__PURE__ */ new Map(), "", paths);
      if (paths.length === 1 && paths[0] === "") {
        state_snapshot_uncloneable();
      } else if (paths.length > 0) {
        const slice = paths.length > 10 ? paths.slice(0, 7) : paths.slice(0, 10);
        const excess = paths.length - slice.length;
        let uncloned = slice.map((path) => `- <value>${path}`).join("\n");
        if (excess > 0) uncloned += `
- ...and ${excess} more`;
        state_snapshot_uncloneable(uncloned);
      }
      return copy;
    }
    return clone(value, /* @__PURE__ */ new Map(), "", empty);
  }
  function clone(value, cloned, path, paths, original = null) {
    if (typeof value === "object" && value !== null) {
      var unwrapped = cloned.get(value);
      if (unwrapped !== void 0) return unwrapped;
      if (value instanceof Map) return (
        /** @type {Snapshot<T>} */
        new Map(value)
      );
      if (value instanceof Set) return (
        /** @type {Snapshot<T>} */
        new Set(value)
      );
      if (is_array(value)) {
        var copy = (
          /** @type {Snapshot<any>} */
          Array(value.length)
        );
        cloned.set(value, copy);
        if (original !== null) {
          cloned.set(original, copy);
        }
        for (var i = 0; i < value.length; i += 1) {
          var element2 = value[i];
          if (i in value) {
            copy[i] = clone(element2, cloned, dev_fallback_default ? `${path}[${i}]` : path, paths);
          }
        }
        return copy;
      }
      if (get_prototype_of(value) === object_prototype) {
        copy = {};
        cloned.set(value, copy);
        if (original !== null) {
          cloned.set(original, copy);
        }
        for (var key in value) {
          copy[key] = clone(value[key], cloned, dev_fallback_default ? `${path}.${key}` : path, paths);
        }
        return copy;
      }
      if (value instanceof Date) {
        return (
          /** @type {Snapshot<T>} */
          structuredClone(value)
        );
      }
      if (typeof /** @type {T & { toJSON?: any } } */
      value.toJSON === "function") {
        return clone(
          /** @type {T & { toJSON(): any } } */
          value.toJSON(),
          cloned,
          dev_fallback_default ? `${path}.toJSON()` : path,
          paths,
          // Associate the instance with the toJSON clone
          value
        );
      }
    }
    if (value instanceof EventTarget) {
      return (
        /** @type {Snapshot<T>} */
        value
      );
    }
    try {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    } catch (e) {
      if (dev_fallback_default) {
        paths.push(path);
      }
      return (
        /** @type {Snapshot<T>} */
        value
      );
    }
  }

  // node_modules/svelte/src/internal/client/dev/tracing.js
  var tracing_expressions = null;
  function get_stack(label) {
    let error = Error();
    const stack2 = error.stack;
    if (stack2) {
      const lines = stack2.split("\n");
      const new_lines = ["\n"];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line === "Error") {
          continue;
        }
        if (line.includes("validate_each_keys")) {
          return null;
        }
        if (line.includes("svelte/src/internal")) {
          continue;
        }
        new_lines.push(line);
      }
      if (new_lines.length === 1) {
        return null;
      }
      define_property(error, "stack", {
        value: new_lines.join("\n")
      });
      define_property(error, "name", {
        // 'Error' suffix is required for stack traces to be rendered properly
        value: `${label}Error`
      });
    }
    return error;
  }

  // node_modules/svelte/src/internal/client/proxy.js
  var parent_metadata = null;
  function proxy(value, prev) {
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = /* @__PURE__ */ new Map();
    var is_proxied_array = is_array(value);
    var version = state(0);
    var stack2 = dev_fallback_default && tracing_mode_flag ? get_stack("CreatedAt") : null;
    var reaction = active_reaction;
    var with_parent = (fn) => {
      var previous_reaction = active_reaction;
      set_active_reaction(reaction);
      var result;
      if (dev_fallback_default) {
        var previous_metadata = parent_metadata;
        parent_metadata = metadata;
        result = fn();
        parent_metadata = previous_metadata;
      } else {
        result = fn();
      }
      set_active_reaction(previous_reaction);
      return result;
    };
    if (is_proxied_array) {
      sources.set("length", state(
        /** @type {any[]} */
        value.length,
        stack2
      ));
    }
    var metadata;
    if (dev_fallback_default) {
      metadata = {
        parent: parent_metadata,
        owners: null
      };
      if (prev) {
        const prev_owners = prev.v?.[STATE_SYMBOL_METADATA]?.owners;
        metadata.owners = prev_owners ? new Set(prev_owners) : null;
      } else {
        metadata.owners = parent_metadata === null ? component_context !== null ? /* @__PURE__ */ new Set([component_context.function]) : null : /* @__PURE__ */ new Set();
      }
    }
    return new Proxy(
      /** @type {any} */
      value,
      {
        defineProperty(_, prop2, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop2);
          if (s === void 0) {
            s = with_parent(() => state(descriptor.value, stack2));
            sources.set(prop2, s);
          } else {
            set(
              s,
              with_parent(() => proxy(descriptor.value))
            );
          }
          return true;
        },
        deleteProperty(target, prop2) {
          var s = sources.get(prop2);
          if (s === void 0) {
            if (prop2 in target) {
              sources.set(
                prop2,
                with_parent(() => state(UNINITIALIZED, stack2))
              );
            }
          } else {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n < ls.v) {
                set(ls, n);
              }
            }
            set(s, UNINITIALIZED);
            update_version(version);
          }
          return true;
        },
        get(target, prop2, receiver) {
          if (dev_fallback_default && prop2 === STATE_SYMBOL_METADATA) {
            return metadata;
          }
          if (prop2 === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop2);
          var exists = prop2 in target;
          if (s === void 0 && (!exists || get_descriptor(target, prop2)?.writable)) {
            s = with_parent(() => state(proxy(exists ? target[prop2] : UNINITIALIZED), stack2));
            sources.set(prop2, s);
          }
          if (s !== void 0) {
            var v = get(s);
            if (dev_fallback_default) {
              var prop_metadata = v?.[STATE_SYMBOL_METADATA];
              if (prop_metadata && prop_metadata?.parent !== metadata) {
                widen_ownership(metadata, prop_metadata);
              }
            }
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop2, receiver);
        },
        getOwnPropertyDescriptor(target, prop2) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop2);
            if (s) descriptor.value = get(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop2);
            var value2 = source2?.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop2) {
          if (dev_fallback_default && prop2 === STATE_SYMBOL_METADATA) {
            return true;
          }
          if (prop2 === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop2);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
          if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop2)?.writable)) {
            if (s === void 0) {
              s = with_parent(() => state(has ? proxy(target[prop2]) : UNINITIALIZED, stack2));
              sources.set(prop2, s);
            }
            var value2 = get(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop2, value2, receiver) {
          var s = sources.get(prop2);
          var has = prop2 in target;
          if (is_proxied_array && prop2 === "length") {
            for (var i = value2; i < /** @type {Source<number>} */
            s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = with_parent(() => state(UNINITIALIZED, stack2));
                sources.set(i + "", other_s);
              }
            }
          }
          if (s === void 0) {
            if (!has || get_descriptor(target, prop2)?.writable) {
              s = with_parent(() => state(void 0, stack2));
              set(
                s,
                with_parent(() => proxy(value2))
              );
              sources.set(prop2, s);
            }
          } else {
            has = s.v !== UNINITIALIZED;
            set(
              s,
              with_parent(() => proxy(value2))
            );
          }
          if (dev_fallback_default) {
            var prop_metadata = value2?.[STATE_SYMBOL_METADATA];
            if (prop_metadata && prop_metadata?.parent !== metadata) {
              widen_ownership(metadata, prop_metadata);
            }
            check_ownership(metadata);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor?.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            update_version(version);
          }
          return true;
        },
        ownKeys(target) {
          get(version);
          var own_keys = Reflect.ownKeys(target).filter((key2) => {
            var source3 = sources.get(key2);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key in target)) {
              own_keys.push(key);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  function update_version(signal, d = 1) {
    set(signal, signal.v + d);
  }
  function get_proxied_value(value) {
    try {
      if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
        return value[STATE_SYMBOL];
      }
    } catch {
    }
    return value;
  }
  function is(a, b) {
    return Object.is(get_proxied_value(a), get_proxied_value(b));
  }

  // node_modules/svelte/src/internal/client/reactivity/sources.js
  var inspect_effects = /* @__PURE__ */ new Set();
  var old_values = /* @__PURE__ */ new Map();
  function set_inspect_effects(v) {
    inspect_effects = v;
  }
  function source(v, stack2) {
    var signal = {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      v,
      reactions: null,
      equals,
      rv: 0,
      wv: 0
    };
    if (dev_fallback_default && tracing_mode_flag) {
      signal.created = stack2 ?? get_stack("CreatedAt");
      signal.debug = null;
    }
    return signal;
  }
  function state(v, stack2) {
    const s = source(v, stack2);
    push_reaction_value(s);
    return s;
  }
  // @__NO_SIDE_EFFECTS__
  function mutable_source(initial_value, immutable = false) {
    const s = source(initial_value);
    if (!immutable) {
      s.equals = safe_equals;
    }
    if (legacy_mode_flag && component_context !== null && component_context.l !== null) {
      (component_context.l.s ??= []).push(s);
    }
    return s;
  }
  function mutate(source2, value) {
    set(
      source2,
      untrack(() => get(source2))
    );
    return value;
  }
  function set(source2, value, should_proxy = false) {
    if (active_reaction !== null && !untracking && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 && !reaction_sources?.includes(source2)) {
      state_unsafe_mutation();
    }
    let new_value = should_proxy ? proxy(value, source2) : value;
    return internal_set(source2, new_value);
  }
  function internal_set(source2, value) {
    if (!source2.equals(value)) {
      var old_value = source2.v;
      if (is_destroying_effect) {
        old_values.set(source2, value);
      } else {
        old_values.set(source2, old_value);
      }
      source2.v = value;
      source2.wv = increment_write_version();
      if (dev_fallback_default && tracing_mode_flag) {
        source2.updated = get_stack("UpdatedAt");
        if (active_effect != null) {
          source2.trace_need_increase = true;
          source2.trace_v ??= old_value;
        }
      }
      mark_reactions(source2, DIRTY);
      if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
      if (dev_fallback_default && inspect_effects.size > 0) {
        const inspects = Array.from(inspect_effects);
        for (const effect2 of inspects) {
          if ((effect2.f & CLEAN) !== 0) {
            set_signal_status(effect2, MAYBE_DIRTY);
          }
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
          }
        }
        inspect_effects.clear();
      }
    }
    return value;
  }
  function update(source2, d = 1) {
    var value = get(source2);
    var result = d === 1 ? value++ : value--;
    set(source2, value);
    return result;
  }
  function mark_reactions(signal, status) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var runes = is_runes();
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags = reaction.f;
      if ((flags & DIRTY) !== 0) continue;
      if (!runes && reaction === active_effect) continue;
      if (dev_fallback_default && (flags & INSPECT_EFFECT) !== 0) {
        inspect_effects.add(reaction);
        continue;
      }
      set_signal_status(reaction, status);
      if ((flags & (CLEAN | UNOWNED)) !== 0) {
        if ((flags & DERIVED) !== 0) {
          mark_reactions(
            /** @type {Derived} */
            reaction,
            MAYBE_DIRTY
          );
        } else {
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
  }

  // node_modules/svelte/src/internal/client/reactivity/deriveds.js
  // @__NO_SIDE_EFFECTS__
  function derived(fn) {
    var flags = DERIVED | DIRTY;
    var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
      /** @type {Derived} */
      active_reaction
    ) : null;
    if (active_effect === null || parent_derived !== null && (parent_derived.f & UNOWNED) !== 0) {
      flags |= UNOWNED;
    } else {
      active_effect.f |= EFFECT_HAS_DERIVED;
    }
    const signal = {
      ctx: component_context,
      deps: null,
      effects: null,
      equals,
      f: flags,
      fn,
      reactions: null,
      rv: 0,
      v: (
        /** @type {V} */
        null
      ),
      wv: 0,
      parent: parent_derived ?? active_effect
    };
    if (dev_fallback_default && tracing_mode_flag) {
      signal.created = get_stack("CreatedAt");
    }
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function derived_safe_equal(fn) {
    const signal = /* @__PURE__ */ derived(fn);
    signal.equals = safe_equals;
    return signal;
  }
  function destroy_derived_effects(derived3) {
    var effects = derived3.effects;
    if (effects !== null) {
      derived3.effects = null;
      for (var i = 0; i < effects.length; i += 1) {
        destroy_effect(
          /** @type {Effect} */
          effects[i]
        );
      }
    }
  }
  var stack = [];
  function get_derived_parent_effect(derived3) {
    var parent = derived3.parent;
    while (parent !== null) {
      if ((parent.f & DERIVED) === 0) {
        return (
          /** @type {Effect} */
          parent
        );
      }
      parent = parent.parent;
    }
    return null;
  }
  function execute_derived(derived3) {
    var value;
    var prev_active_effect = active_effect;
    set_active_effect(get_derived_parent_effect(derived3));
    if (dev_fallback_default) {
      let prev_inspect_effects = inspect_effects;
      set_inspect_effects(/* @__PURE__ */ new Set());
      try {
        if (stack.includes(derived3)) {
          derived_references_self();
        }
        stack.push(derived3);
        destroy_derived_effects(derived3);
        value = update_reaction(derived3);
      } finally {
        set_active_effect(prev_active_effect);
        set_inspect_effects(prev_inspect_effects);
        stack.pop();
      }
    } else {
      try {
        destroy_derived_effects(derived3);
        value = update_reaction(derived3);
      } finally {
        set_active_effect(prev_active_effect);
      }
    }
    return value;
  }
  function update_derived(derived3) {
    var value = execute_derived(derived3);
    var status = (skip_reaction || (derived3.f & UNOWNED) !== 0) && derived3.deps !== null ? MAYBE_DIRTY : CLEAN;
    set_signal_status(derived3, status);
    if (!derived3.equals(value)) {
      derived3.v = value;
      derived3.wv = increment_write_version();
    }
  }

  // node_modules/svelte/src/internal/client/warnings.js
  var bold2 = "font-weight: bold";
  var normal2 = "font-weight: normal";
  function console_log_state(method) {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] console_log_state
%cYour \`console.${method}\` contained \`$state\` proxies. Consider using \`$inspect(...)\` or \`$state.snapshot(...)\` instead
https://svelte.dev/e/console_log_state`, bold2, normal2);
    } else {
      console.warn(`https://svelte.dev/e/console_log_state`);
    }
  }
  function hydration_attribute_changed(attribute, html2, value) {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] hydration_attribute_changed
%cThe \`${attribute}\` attribute on \`${html2}\` changed its value between server and client renders. The client value, \`${value}\`, will be ignored in favour of the server value
https://svelte.dev/e/hydration_attribute_changed`, bold2, normal2);
    } else {
      console.warn(`https://svelte.dev/e/hydration_attribute_changed`);
    }
  }
  function hydration_mismatch(location) {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] hydration_mismatch
%c${location ? `Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near ${location}` : "Hydration failed because the initial UI does not match what was rendered on the server"}
https://svelte.dev/e/hydration_mismatch`, bold2, normal2);
    } else {
      console.warn(`https://svelte.dev/e/hydration_mismatch`);
    }
  }
  function lifecycle_double_unmount() {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] lifecycle_double_unmount
%cTried to unmount a component that was not mounted
https://svelte.dev/e/lifecycle_double_unmount`, bold2, normal2);
    } else {
      console.warn(`https://svelte.dev/e/lifecycle_double_unmount`);
    }
  }
  function ownership_invalid_binding(parent, child2, owner) {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] ownership_invalid_binding
%c${parent} passed a value to ${child2} with \`bind:\`, but the value is owned by ${owner}. Consider creating a binding between ${owner} and ${parent}
https://svelte.dev/e/ownership_invalid_binding`, bold2, normal2);
    } else {
      console.warn(`https://svelte.dev/e/ownership_invalid_binding`);
    }
  }
  function ownership_invalid_mutation(component2, owner) {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] ownership_invalid_mutation
%c${component2 ? `${component2} mutated a value owned by ${owner}. This is strongly discouraged. Consider passing values to child components with \`bind:\`, or use a callback instead` : "Mutating a value outside the component that created it is strongly discouraged. Consider passing values to child components with `bind:`, or use a callback instead"}
https://svelte.dev/e/ownership_invalid_mutation`, bold2, normal2);
    } else {
      console.warn(`https://svelte.dev/e/ownership_invalid_mutation`);
    }
  }
  function state_proxy_equality_mismatch(operator) {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results
https://svelte.dev/e/state_proxy_equality_mismatch`, bold2, normal2);
    } else {
      console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
    }
  }

  // node_modules/svelte/src/internal/client/dom/hydration.js
  var hydrating = false;
  function set_hydrating(value) {
    hydrating = value;
  }
  var hydrate_node;
  function set_hydrate_node(node) {
    if (node === null) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    return hydrate_node = node;
  }
  function hydrate_next() {
    return set_hydrate_node(
      /** @type {TemplateNode} */
      get_next_sibling(hydrate_node)
    );
  }
  function reset(node) {
    if (!hydrating) return;
    if (get_next_sibling(hydrate_node) !== null) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    hydrate_node = node;
  }
  function remove_nodes() {
    var depth = 0;
    var node = hydrate_node;
    while (true) {
      if (node.nodeType === 8) {
        var data = (
          /** @type {Comment} */
          node.data
        );
        if (data === HYDRATION_END) {
          if (depth === 0) return node;
          depth -= 1;
        } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE) {
          depth += 1;
        }
      }
      var next2 = (
        /** @type {TemplateNode} */
        get_next_sibling(node)
      );
      node.remove();
      node = next2;
    }
  }

  // node_modules/svelte/src/internal/client/dev/equality.js
  function init_array_prototype_warnings() {
    const array_prototype2 = Array.prototype;
    const cleanup = Array.__svelte_cleanup;
    if (cleanup) {
      cleanup();
    }
    const { indexOf, lastIndexOf, includes } = array_prototype2;
    array_prototype2.indexOf = function(item, from_index) {
      const index2 = indexOf.call(this, item, from_index);
      if (index2 === -1) {
        for (let i = from_index ?? 0; i < this.length; i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.indexOf(...)");
            break;
          }
        }
      }
      return index2;
    };
    array_prototype2.lastIndexOf = function(item, from_index) {
      const index2 = lastIndexOf.call(this, item, from_index ?? this.length - 1);
      if (index2 === -1) {
        for (let i = 0; i <= (from_index ?? this.length - 1); i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.lastIndexOf(...)");
            break;
          }
        }
      }
      return index2;
    };
    array_prototype2.includes = function(item, from_index) {
      const has = includes.call(this, item, from_index);
      if (!has) {
        for (let i = 0; i < this.length; i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.includes(...)");
            break;
          }
        }
      }
      return has;
    };
    Array.__svelte_cleanup = () => {
      array_prototype2.indexOf = indexOf;
      array_prototype2.lastIndexOf = lastIndexOf;
      array_prototype2.includes = includes;
    };
  }
  function strict_equals(a, b, equal = true) {
    try {
      if (a === b !== (get_proxied_value(a) === get_proxied_value(b))) {
        state_proxy_equality_mismatch(equal ? "===" : "!==");
      }
    } catch {
    }
    return a === b === equal;
  }

  // node_modules/svelte/src/internal/client/dom/operations.js
  var $window;
  var $document;
  var is_firefox;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    $document = document;
    is_firefox = /Firefox/.test(navigator.userAgent);
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    var text_prototype = Text.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    if (is_extensible(element_prototype)) {
      element_prototype.__click = void 0;
      element_prototype.__className = void 0;
      element_prototype.__attributes = null;
      element_prototype.__style = void 0;
      element_prototype.__e = void 0;
    }
    if (is_extensible(text_prototype)) {
      text_prototype.__t = void 0;
    }
    if (dev_fallback_default) {
      element_prototype.__svelte_meta = null;
      init_array_prototype_warnings();
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
  // @__NO_SIDE_EFFECTS__
  function get_first_child(node) {
    return first_child_getter.call(node);
  }
  // @__NO_SIDE_EFFECTS__
  function get_next_sibling(node) {
    return next_sibling_getter.call(node);
  }
  function child(node, is_text) {
    if (!hydrating) {
      return /* @__PURE__ */ get_first_child(node);
    }
    var child2 = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(hydrate_node)
    );
    if (child2 === null) {
      child2 = hydrate_node.appendChild(create_text());
    } else if (is_text && child2.nodeType !== 3) {
      var text2 = create_text();
      child2?.before(text2);
      set_hydrate_node(text2);
      return text2;
    }
    set_hydrate_node(child2);
    return child2;
  }
  function first_child(fragment, is_text) {
    if (!hydrating) {
      var first = (
        /** @type {DocumentFragment} */
        /* @__PURE__ */ get_first_child(
          /** @type {Node} */
          fragment
        )
      );
      if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
      return first;
    }
    if (is_text && hydrate_node?.nodeType !== 3) {
      var text2 = create_text();
      hydrate_node?.before(text2);
      set_hydrate_node(text2);
      return text2;
    }
    return hydrate_node;
  }
  function sibling(node, count = 1, is_text = false) {
    let next_sibling = hydrating ? hydrate_node : node;
    var last_sibling;
    while (count--) {
      last_sibling = next_sibling;
      next_sibling = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(next_sibling);
    }
    if (!hydrating) {
      return next_sibling;
    }
    var type = next_sibling?.nodeType;
    if (is_text && type !== 3) {
      var text2 = create_text();
      if (next_sibling === null) {
        last_sibling?.after(text2);
      } else {
        next_sibling.before(text2);
      }
      set_hydrate_node(text2);
      return text2;
    }
    set_hydrate_node(next_sibling);
    return (
      /** @type {TemplateNode} */
      next_sibling
    );
  }
  function clear_text_content(node) {
    node.textContent = "";
  }

  // node_modules/svelte/src/internal/client/runtime.js
  var handled_errors = /* @__PURE__ */ new WeakSet();
  var is_throwing_error = false;
  var is_flushing = false;
  var last_scheduled_effect = null;
  var is_updating_effect = false;
  var is_destroying_effect = false;
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  var queued_root_effects = [];
  var dev_effect_stack = [];
  var active_reaction = null;
  var untracking = false;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  var active_effect = null;
  function set_active_effect(effect2) {
    active_effect = effect2;
  }
  var reaction_sources = null;
  function set_reaction_sources(sources) {
    reaction_sources = sources;
  }
  function push_reaction_value(value) {
    if (active_reaction !== null && active_reaction.f & EFFECT_IS_UPDATING) {
      if (reaction_sources === null) {
        set_reaction_sources([value]);
      } else {
        reaction_sources.push(value);
      }
    }
  }
  var new_deps = null;
  var skipped_deps = 0;
  var untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  var write_version = 1;
  var read_version = 0;
  var skip_reaction = false;
  var captured_signals = null;
  function increment_write_version() {
    return ++write_version;
  }
  function check_dirtiness(reaction) {
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) {
      return true;
    }
    if ((flags & MAYBE_DIRTY) !== 0) {
      var dependencies = reaction.deps;
      var is_unowned = (flags & UNOWNED) !== 0;
      if (dependencies !== null) {
        var i;
        var dependency;
        var is_disconnected = (flags & DISCONNECTED) !== 0;
        var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
        var length = dependencies.length;
        if (is_disconnected || is_unowned_connected) {
          var derived3 = (
            /** @type {Derived} */
            reaction
          );
          var parent = derived3.parent;
          for (i = 0; i < length; i++) {
            dependency = dependencies[i];
            if (is_disconnected || !dependency?.reactions?.includes(derived3)) {
              (dependency.reactions ??= []).push(derived3);
            }
          }
          if (is_disconnected) {
            derived3.f ^= DISCONNECTED;
          }
          if (is_unowned_connected && parent !== null && (parent.f & UNOWNED) === 0) {
            derived3.f ^= UNOWNED;
          }
        }
        for (i = 0; i < length; i++) {
          dependency = dependencies[i];
          if (check_dirtiness(
            /** @type {Derived} */
            dependency
          )) {
            update_derived(
              /** @type {Derived} */
              dependency
            );
          }
          if (dependency.wv > reaction.wv) {
            return true;
          }
        }
      }
      if (!is_unowned || active_effect !== null && !skip_reaction) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function propagate_error(error, effect2) {
    var current = effect2;
    while (current !== null) {
      if ((current.f & BOUNDARY_EFFECT) !== 0) {
        try {
          current.fn(error);
          return;
        } catch {
          current.f ^= BOUNDARY_EFFECT;
        }
      }
      current = current.parent;
    }
    is_throwing_error = false;
    throw error;
  }
  function should_rethrow_error(effect2) {
    return (effect2.f & DESTROYED) === 0 && (effect2.parent === null || (effect2.parent.f & BOUNDARY_EFFECT) === 0);
  }
  function handle_error(error, effect2, previous_effect, component_context2) {
    if (is_throwing_error) {
      if (previous_effect === null) {
        is_throwing_error = false;
      }
      if (should_rethrow_error(effect2)) {
        throw error;
      }
      return;
    }
    if (previous_effect !== null) {
      is_throwing_error = true;
    }
    if (!dev_fallback_default || component_context2 === null || !(error instanceof Error) || handled_errors.has(error)) {
      propagate_error(error, effect2);
      return;
    }
    handled_errors.add(error);
    const component_stack = [];
    const effect_name = effect2.fn?.name;
    if (effect_name) {
      component_stack.push(effect_name);
    }
    let current_context = component_context2;
    while (current_context !== null) {
      if (dev_fallback_default) {
        var filename = current_context.function?.[FILENAME];
        if (filename) {
          const file = filename.split("/").pop();
          component_stack.push(file);
        }
      }
      current_context = current_context.p;
    }
    const indent = is_firefox ? "  " : "	";
    define_property(error, "message", {
      value: error.message + `
${component_stack.map((name) => `
${indent}in ${name}`).join("")}
`
    });
    define_property(error, "component_stack", {
      value: component_stack
    });
    const stack2 = error.stack;
    if (stack2) {
      const lines = stack2.split("\n");
      const new_lines = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes("svelte/src/internal")) {
          continue;
        }
        new_lines.push(line);
      }
      define_property(error, "stack", {
        value: new_lines.join("\n")
      });
    }
    propagate_error(error, effect2);
    if (should_rethrow_error(effect2)) {
      throw error;
    }
  }
  function schedule_possible_effect_self_invalidation(signal, effect2, root6 = true) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i];
      if (reaction_sources?.includes(signal)) continue;
      if ((reaction.f & DERIVED) !== 0) {
        schedule_possible_effect_self_invalidation(
          /** @type {Derived} */
          reaction,
          effect2,
          false
        );
      } else if (effect2 === reaction) {
        if (root6) {
          set_signal_status(reaction, DIRTY);
        } else if ((reaction.f & CLEAN) !== 0) {
          set_signal_status(reaction, MAYBE_DIRTY);
        }
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
  function update_reaction(reaction) {
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_skip_reaction = skip_reaction;
    var previous_reaction_sources = reaction_sources;
    var previous_component_context = component_context;
    var previous_untracking = untracking;
    var flags = reaction.f;
    new_deps = /** @type {null | Value[]} */
    null;
    skipped_deps = 0;
    untracked_writes = null;
    skip_reaction = (flags & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null);
    active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    reaction_sources = null;
    set_component_context(reaction.ctx);
    untracking = false;
    read_version++;
    reaction.f |= EFFECT_IS_UPDATING;
    try {
      var result = (
        /** @type {Function} */
        (0, reaction.fn)()
      );
      var deps = reaction.deps;
      if (new_deps !== null) {
        var i;
        remove_reactions(reaction, skipped_deps);
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (!skip_reaction) {
          for (i = skipped_deps; i < deps.length; i++) {
            (deps[i].reactions ??= []).push(reaction);
          }
        }
      } else if (deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
        for (i = 0; i < /** @type {Source[]} */
        untracked_writes.length; i++) {
          schedule_possible_effect_self_invalidation(
            untracked_writes[i],
            /** @type {Effect} */
            reaction
          );
        }
      }
      if (previous_reaction !== null) {
        read_version++;
        if (untracked_writes !== null) {
          if (previous_untracked_writes === null) {
            previous_untracked_writes = untracked_writes;
          } else {
            previous_untracked_writes.push(.../** @type {Source[]} */
            untracked_writes);
          }
        }
      }
      return result;
    } finally {
      new_deps = previous_deps;
      skipped_deps = previous_skipped_deps;
      untracked_writes = previous_untracked_writes;
      active_reaction = previous_reaction;
      skip_reaction = previous_skip_reaction;
      reaction_sources = previous_reaction_sources;
      set_component_context(previous_component_context);
      untracking = previous_untracking;
      reaction.f ^= EFFECT_IS_UPDATING;
    }
  }
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index2 = index_of.call(reactions, signal);
      if (index2 !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index2] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
    // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    // allows us to skip the expensive work of disconnecting and immediately reconnecting it
    (new_deps === null || !new_deps.includes(dependency))) {
      set_signal_status(dependency, MAYBE_DIRTY);
      if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
        dependency.f ^= DISCONNECTED;
      }
      destroy_derived_effects(
        /** @type {Derived} **/
        dependency
      );
      remove_reactions(
        /** @type {Derived} **/
        dependency,
        0
      );
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect2) {
    var flags = effect2.f;
    if ((flags & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var previous_effect = active_effect;
    var previous_component_context = component_context;
    var was_updating_effect = is_updating_effect;
    active_effect = effect2;
    is_updating_effect = true;
    if (dev_fallback_default) {
      var previous_component_fn = dev_current_component_function;
      set_dev_current_component_function(effect2.component_function);
    }
    try {
      if ((flags & BLOCK_EFFECT) !== 0) {
        destroy_block_effect_children(effect2);
      } else {
        destroy_effect_children(effect2);
      }
      execute_effect_teardown(effect2);
      var teardown2 = update_reaction(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
      effect2.wv = write_version;
      var deps = effect2.deps;
      if (dev_fallback_default && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && deps !== null) {
        for (let i = 0; i < deps.length; i++) {
          var dep = deps[i];
          if (dep.trace_need_increase) {
            dep.wv = increment_write_version();
            dep.trace_need_increase = void 0;
            dep.trace_v = void 0;
          }
        }
      }
      if (dev_fallback_default) {
        dev_effect_stack.push(effect2);
      }
    } catch (error) {
      handle_error(error, effect2, previous_effect, previous_component_context || effect2.ctx);
    } finally {
      is_updating_effect = was_updating_effect;
      active_effect = previous_effect;
      if (dev_fallback_default) {
        set_dev_current_component_function(previous_component_fn);
      }
    }
  }
  function log_effect_stack() {
    console.error(
      "Last ten effects were: ",
      dev_effect_stack.slice(-10).map((d) => d.fn)
    );
    dev_effect_stack = [];
  }
  function infinite_loop_guard() {
    try {
      effect_update_depth_exceeded();
    } catch (error) {
      if (dev_fallback_default) {
        define_property(error, "stack", {
          value: ""
        });
      }
      if (last_scheduled_effect !== null) {
        if (dev_fallback_default) {
          try {
            handle_error(error, last_scheduled_effect, null, null);
          } catch (e) {
            log_effect_stack();
            throw e;
          }
        } else {
          handle_error(error, last_scheduled_effect, null, null);
        }
      } else {
        if (dev_fallback_default) {
          log_effect_stack();
        }
        throw error;
      }
    }
  }
  function flush_queued_root_effects() {
    var was_updating_effect = is_updating_effect;
    try {
      var flush_count = 0;
      is_updating_effect = true;
      while (queued_root_effects.length > 0) {
        if (flush_count++ > 1e3) {
          infinite_loop_guard();
        }
        var root_effects = queued_root_effects;
        var length = root_effects.length;
        queued_root_effects = [];
        for (var i = 0; i < length; i++) {
          var collected_effects = process_effects(root_effects[i]);
          flush_queued_effects(collected_effects);
        }
      }
    } finally {
      is_flushing = false;
      is_updating_effect = was_updating_effect;
      last_scheduled_effect = null;
      if (dev_fallback_default) {
        dev_effect_stack = [];
      }
      old_values.clear();
    }
  }
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    for (var i = 0; i < length; i++) {
      var effect2 = effects[i];
      if ((effect2.f & (DESTROYED | INERT)) === 0) {
        try {
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
            if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
              if (effect2.teardown === null) {
                unlink_effect(effect2);
              } else {
                effect2.fn = null;
              }
            }
          }
        } catch (error) {
          handle_error(error, effect2, null, effect2.ctx);
        }
      }
    }
  }
  function schedule_effect(signal) {
    if (!is_flushing) {
      is_flushing = true;
      queueMicrotask(flush_queued_root_effects);
    }
    var effect2 = last_scheduled_effect = signal;
    while (effect2.parent !== null) {
      effect2 = effect2.parent;
      var flags = effect2.f;
      if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags & CLEAN) === 0) return;
        effect2.f ^= CLEAN;
      }
    }
    queued_root_effects.push(effect2);
  }
  function process_effects(root6) {
    var effects = [];
    var effect2 = root6;
    while (effect2 !== null) {
      var flags = effect2.f;
      var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
      var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
      if (!is_skippable_branch && (flags & INERT) === 0) {
        if ((flags & EFFECT) !== 0) {
          effects.push(effect2);
        } else if (is_branch) {
          effect2.f ^= CLEAN;
        } else {
          var previous_active_reaction = active_reaction;
          try {
            active_reaction = effect2;
            if (check_dirtiness(effect2)) {
              update_effect(effect2);
            }
          } catch (error) {
            handle_error(error, effect2, null, effect2.ctx);
          } finally {
            active_reaction = previous_active_reaction;
          }
        }
        var child2 = effect2.first;
        if (child2 !== null) {
          effect2 = child2;
          continue;
        }
      }
      var parent = effect2.parent;
      effect2 = effect2.next;
      while (effect2 === null && parent !== null) {
        effect2 = parent.next;
        parent = parent.parent;
      }
    }
    return effects;
  }
  function flushSync(fn) {
    var result;
    if (fn) {
      is_flushing = true;
      flush_queued_root_effects();
      result = fn();
    }
    flush_tasks();
    while (queued_root_effects.length > 0) {
      is_flushing = true;
      flush_queued_root_effects();
      flush_tasks();
    }
    return (
      /** @type {T} */
      result
    );
  }
  function get(signal) {
    var flags = signal.f;
    var is_derived = (flags & DERIVED) !== 0;
    if (captured_signals !== null) {
      captured_signals.add(signal);
    }
    if (active_reaction !== null && !untracking) {
      if (!reaction_sources?.includes(signal)) {
        var deps = active_reaction.deps;
        if (signal.rv < read_version) {
          signal.rv = read_version;
          if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
            skipped_deps++;
          } else if (new_deps === null) {
            new_deps = [signal];
          } else if (!skip_reaction || !new_deps.includes(signal)) {
            new_deps.push(signal);
          }
        }
      }
    } else if (is_derived && /** @type {Derived} */
    signal.deps === null && /** @type {Derived} */
    signal.effects === null) {
      var derived3 = (
        /** @type {Derived} */
        signal
      );
      var parent = derived3.parent;
      if (parent !== null && (parent.f & UNOWNED) === 0) {
        derived3.f ^= UNOWNED;
      }
    }
    if (is_derived) {
      derived3 = /** @type {Derived} */
      signal;
      if (check_dirtiness(derived3)) {
        update_derived(derived3);
      }
    }
    if (dev_fallback_default && tracing_mode_flag && tracing_expressions !== null && active_reaction !== null && tracing_expressions.reaction === active_reaction) {
      if (signal.debug) {
        signal.debug();
      } else if (signal.created) {
        var entry = tracing_expressions.entries.get(signal);
        if (entry === void 0) {
          entry = { read: [] };
          tracing_expressions.entries.set(signal, entry);
        }
        entry.read.push(get_stack("TracedAt"));
      }
    }
    if (is_destroying_effect && old_values.has(signal)) {
      return old_values.get(signal);
    }
    return signal.v;
  }
  function capture_signals(fn) {
    var previous_captured_signals = captured_signals;
    captured_signals = /* @__PURE__ */ new Set();
    var captured = captured_signals;
    var signal;
    try {
      untrack(fn);
      if (previous_captured_signals !== null) {
        for (signal of captured_signals) {
          previous_captured_signals.add(signal);
        }
      }
    } finally {
      captured_signals = previous_captured_signals;
    }
    return captured;
  }
  function invalidate_inner_signals(fn) {
    var captured = capture_signals(() => untrack(fn));
    for (var signal of captured) {
      if ((signal.f & LEGACY_DERIVED_PROP) !== 0) {
        for (
          const dep of
          /** @type {Derived} */
          signal.deps || []
        ) {
          if ((dep.f & DERIVED) === 0) {
            internal_set(dep, dep.v);
          }
        }
      } else {
        internal_set(signal, signal.v);
      }
    }
  }
  function untrack(fn) {
    var previous_untracking = untracking;
    try {
      untracking = true;
      return fn();
    } finally {
      untracking = previous_untracking;
    }
  }
  var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function deep_read_state(value) {
    if (typeof value !== "object" || !value || value instanceof EventTarget) {
      return;
    }
    if (STATE_SYMBOL in value) {
      deep_read(value);
    } else if (!Array.isArray(value)) {
      for (let key in value) {
        const prop2 = value[key];
        if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
          deep_read(prop2);
        }
      }
    }
  }
  function deep_read(value, visited = /* @__PURE__ */ new Set()) {
    if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
    !(value instanceof EventTarget) && !visited.has(value)) {
      visited.add(value);
      if (value instanceof Date) {
        value.getTime();
      }
      for (let key in value) {
        try {
          deep_read(value[key], visited);
        } catch (e) {
        }
      }
      const proto = get_prototype_of(value);
      if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
        const descriptors = get_descriptors(proto);
        for (let key in descriptors) {
          const get3 = descriptors[key].get;
          if (get3) {
            try {
              get3.call(value);
            } catch (e) {
            }
          }
        }
      }
    }
  }

  // node_modules/svelte/src/internal/client/reactivity/effects.js
  function validate_effect(rune) {
    if (active_effect === null && active_reaction === null) {
      effect_orphan(rune);
    }
    if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0 && active_effect === null) {
      effect_in_unowned_derived();
    }
    if (is_destroying_effect) {
      effect_in_teardown(rune);
    }
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn, sync, push2 = true) {
    var parent = active_effect;
    if (dev_fallback_default) {
      while (parent !== null && (parent.f & INSPECT_EFFECT) !== 0) {
        parent = parent.parent;
      }
    }
    var effect2 = {
      ctx: component_context,
      deps: null,
      nodes_start: null,
      nodes_end: null,
      f: type | DIRTY,
      first: null,
      fn,
      last: null,
      next: null,
      parent,
      prev: null,
      teardown: null,
      transitions: null,
      wv: 0
    };
    if (dev_fallback_default) {
      effect2.component_function = dev_current_component_function;
    }
    if (sync) {
      try {
        update_effect(effect2);
        effect2.f |= EFFECT_RAN;
      } catch (e) {
        destroy_effect(effect2);
        throw e;
      }
    } else if (fn !== null) {
      schedule_effect(effect2);
    }
    var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & (EFFECT_HAS_DERIVED | BOUNDARY_EFFECT)) === 0;
    if (!inert && push2) {
      if (parent !== null) {
        push_effect(effect2, parent);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
        var derived3 = (
          /** @type {Derived} */
          active_reaction
        );
        (derived3.effects ??= []).push(effect2);
      }
    }
    return effect2;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null, false);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function user_effect(fn) {
    validate_effect("$effect");
    var defer = active_effect !== null && (active_effect.f & BRANCH_EFFECT) !== 0 && component_context !== null && !component_context.m;
    if (dev_fallback_default) {
      define_property(fn, "name", {
        value: "$effect"
      });
    }
    if (defer) {
      var context = (
        /** @type {ComponentContext} */
        component_context
      );
      (context.e ??= []).push({
        fn,
        effect: active_effect,
        reaction: active_reaction
      });
    } else {
      var signal = effect(fn);
      return signal;
    }
  }
  function user_pre_effect(fn) {
    validate_effect("$effect.pre");
    if (dev_fallback_default) {
      define_property(fn, "name", {
        value: "$effect.pre"
      });
    }
    return render_effect(fn);
  }
  function effect_root(fn) {
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return () => {
      destroy_effect(effect2);
    };
  }
  function component_root(fn) {
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect2, () => {
            destroy_effect(effect2);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect2);
          fulfil(void 0);
        }
      });
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn, false);
  }
  function legacy_pre_effect(deps, fn) {
    var context = (
      /** @type {ComponentContextLegacy} */
      component_context
    );
    var token = { effect: null, ran: false };
    context.l.r1.push(token);
    token.effect = render_effect(() => {
      deps();
      if (token.ran) return;
      token.ran = true;
      set(context.l.r2, true);
      untrack(fn);
    });
  }
  function legacy_pre_effect_reset() {
    var context = (
      /** @type {ComponentContextLegacy} */
      component_context
    );
    render_effect(() => {
      if (!get(context.l.r2)) return;
      for (var token of context.l.r1) {
        var effect2 = token.effect;
        if ((effect2.f & CLEAN) !== 0) {
          set_signal_status(effect2, MAYBE_DIRTY);
        }
        if (check_dirtiness(effect2)) {
          update_effect(effect2);
        }
        token.ran = false;
      }
      context.l.r2.v = false;
    });
  }
  function render_effect(fn) {
    return create_effect(RENDER_EFFECT, fn, true);
  }
  function template_effect(fn, thunks = [], d = derived) {
    const deriveds = thunks.map(d);
    const effect2 = () => fn(...deriveds.map(get));
    if (dev_fallback_default) {
      define_property(effect2, "name", {
        value: "{expression}"
      });
    }
    return block(effect2);
  }
  function block(fn, flags = 0) {
    return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
  }
  function branch(fn, push2 = true) {
    return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown2.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect2 = signal.first;
    signal.first = signal.last = null;
    while (effect2 !== null) {
      var next2 = effect2.next;
      if ((effect2.f & ROOT_EFFECT) !== 0) {
        effect2.parent = null;
      } else {
        destroy_effect(effect2, remove_dom);
      }
      effect2 = next2;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect2 = signal.first;
    while (effect2 !== null) {
      var next2 = effect2.next;
      if ((effect2.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect2);
      }
      effect2 = next2;
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null) {
      var node = effect2.nodes_start;
      var end = effect2.nodes_end;
      while (node !== null) {
        var next2 = node === end ? null : (
          /** @type {TemplateNode} */
          get_next_sibling(node)
        );
        node.remove();
        node = next2;
      }
      removed = true;
    }
    destroy_effect_children(effect2, remove_dom && !removed);
    remove_reactions(effect2, 0);
    set_signal_status(effect2, DESTROYED);
    var transitions = effect2.transitions;
    if (transitions !== null) {
      for (const transition2 of transitions) {
        transition2.stop();
      }
    }
    execute_effect_teardown(effect2);
    var parent = effect2.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect2);
    }
    if (dev_fallback_default) {
      effect2.component_function = null;
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes_start = effect2.nodes_end = null;
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev = effect2.prev;
    var next2 = effect2.next;
    if (prev !== null) prev.next = next2;
    if (next2 !== null) next2.prev = prev;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next2;
      if (parent.last === effect2) parent.last = prev;
    }
  }
  function pause_effect(effect2, callback) {
    var transitions = [];
    pause_children(effect2, transitions, true);
    run_out_transitions(transitions, () => {
      destroy_effect(effect2);
      if (callback) callback();
    });
  }
  function run_out_transitions(transitions, fn) {
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition2 of transitions) {
        transition2.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect2, transitions, local) {
    if ((effect2.f & INERT) !== 0) return;
    effect2.f ^= INERT;
    if (effect2.transitions !== null) {
      for (const transition2 of effect2.transitions) {
        if (transition2.is_global || local) {
          transitions.push(transition2);
        }
      }
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
      child2 = sibling2;
    }
  }
  function resume_effect(effect2) {
    resume_children(effect2, true);
  }
  function resume_children(effect2, local) {
    if ((effect2.f & INERT) === 0) return;
    effect2.f ^= INERT;
    if ((effect2.f & CLEAN) === 0) {
      effect2.f ^= CLEAN;
    }
    if (check_dirtiness(effect2)) {
      set_signal_status(effect2, DIRTY);
      schedule_effect(effect2);
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      resume_children(child2, transparent ? local : false);
      child2 = sibling2;
    }
    if (effect2.transitions !== null) {
      for (const transition2 of effect2.transitions) {
        if (transition2.is_global || local) {
          transition2.in();
        }
      }
    }
  }

  // node_modules/svelte/src/internal/client/dev/ownership.js
  var boundaries = {};
  var chrome_pattern = /at (?:.+ \()?(.+):(\d+):(\d+)\)?$/;
  var firefox_pattern = /@(.+):(\d+):(\d+)$/;
  function get_stack2() {
    const stack2 = new Error().stack;
    if (!stack2) return null;
    const entries = [];
    for (const line of stack2.split("\n")) {
      let match = chrome_pattern.exec(line) ?? firefox_pattern.exec(line);
      if (match) {
        entries.push({
          file: match[1],
          line: +match[2],
          column: +match[3]
        });
      }
    }
    return entries;
  }
  function get_component() {
    const stack2 = get_stack2()?.slice(4);
    if (!stack2) return null;
    for (let i = 0; i < stack2.length; i++) {
      const entry = stack2[i];
      const modules = boundaries[entry.file];
      if (!modules) {
        if (i === 0) return null;
        continue;
      }
      for (const module of modules) {
        if (module.end == null) {
          return null;
        }
        if (module.start.line < entry.line && module.end.line > entry.line) {
          return module.component;
        }
      }
    }
    return null;
  }
  var ADD_OWNER = Symbol("ADD_OWNER");
  function mark_module_start() {
    const start = get_stack2()?.[2];
    if (start) {
      (boundaries[start.file] ??= []).push({
        start,
        // @ts-expect-error
        end: null,
        // @ts-expect-error we add the component at the end, since HMR will overwrite the function
        component: null
      });
    }
  }
  function mark_module_end(component2) {
    const end = get_stack2()?.[2];
    if (end) {
      const boundaries_file = boundaries[end.file];
      const boundary2 = boundaries_file[boundaries_file.length - 1];
      boundary2.end = end;
      boundary2.component = component2;
    }
  }
  function add_owner(object, owner, global = false, skip_warning = false) {
    if (object && !global) {
      const component2 = dev_current_component_function;
      const metadata = object[STATE_SYMBOL_METADATA];
      if (metadata && !has_owner(metadata, component2)) {
        let original = get_owner(metadata);
        if (owner && owner[FILENAME] !== component2[FILENAME] && !skip_warning) {
          ownership_invalid_binding(component2[FILENAME], owner[FILENAME], original[FILENAME]);
        }
      }
    }
    add_owner_to_object(object, owner, /* @__PURE__ */ new Set());
  }
  function add_owner_effect(get_object, Component, skip_warning = false) {
    user_pre_effect(() => {
      add_owner(get_object(), Component, false, skip_warning);
    });
  }
  function widen_ownership(from, to) {
    if (to.owners === null) {
      return;
    }
    while (from) {
      if (from.owners === null) {
        to.owners = null;
        break;
      }
      for (const owner of from.owners) {
        to.owners.add(owner);
      }
      from = from.parent;
    }
  }
  function add_owner_to_object(object, owner, seen) {
    const metadata = (
      /** @type {ProxyMetadata} */
      object?.[STATE_SYMBOL_METADATA]
    );
    if (metadata) {
      if ("owners" in metadata && metadata.owners != null) {
        if (owner) {
          metadata.owners.add(owner);
        } else {
          metadata.owners = null;
        }
      }
    } else if (object && typeof object === "object") {
      if (seen.has(object)) return;
      seen.add(object);
      if (ADD_OWNER in object && object[ADD_OWNER]) {
        render_effect(() => {
          object[ADD_OWNER](owner);
        });
      } else {
        var proto = get_prototype_of(object);
        if (proto === Object.prototype) {
          for (const key in object) {
            if (Object.getOwnPropertyDescriptor(object, key)?.get) {
              let current = UNINITIALIZED;
              render_effect(() => {
                const next2 = object[key];
                if (current !== next2) {
                  current = next2;
                  add_owner_to_object(next2, owner, seen);
                }
              });
            } else {
              add_owner_to_object(object[key], owner, seen);
            }
          }
        } else if (proto === Array.prototype) {
          for (let i = 0; i < object.length; i += 1) {
            add_owner_to_object(object[i], owner, seen);
          }
        }
      }
    }
  }
  function has_owner(metadata, component2) {
    if (metadata.owners === null) {
      return true;
    }
    return metadata.owners.has(component2) || // This helps avoid false positives when using HMR, where the component function is replaced
    FILENAME in component2 && [...metadata.owners].some(
      (owner) => (
        /** @type {any} */
        owner[FILENAME] === component2[FILENAME]
      )
    ) || metadata.parent !== null && has_owner(metadata.parent, component2);
  }
  function get_owner(metadata) {
    return metadata?.owners?.values().next().value ?? get_owner(
      /** @type {ProxyMetadata} */
      metadata.parent
    );
  }
  var skip = false;
  function check_ownership(metadata) {
    if (skip) return;
    const component2 = get_component();
    if (component2 && !has_owner(metadata, component2)) {
      let original = get_owner(metadata);
      if (original[FILENAME] !== component2[FILENAME]) {
        ownership_invalid_mutation(component2[FILENAME], original[FILENAME]);
      } else {
        ownership_invalid_mutation();
      }
    }
  }

  // node_modules/svelte/src/internal/shared/errors.js
  function lifecycle_outside_component(name) {
    if (dev_fallback_default) {
      const error = new Error(`lifecycle_outside_component
\`${name}(...)\` can only be used during component initialisation
https://svelte.dev/e/lifecycle_outside_component`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
    }
  }
  function store_invalid_shape(name) {
    if (dev_fallback_default) {
      const error = new Error(`store_invalid_shape
\`${name}\` is not a store with a \`subscribe\` method
https://svelte.dev/e/store_invalid_shape`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/store_invalid_shape`);
    }
  }

  // node_modules/svelte/src/internal/client/context.js
  var component_context = null;
  function set_component_context(context) {
    component_context = context;
  }
  var dev_current_component_function = null;
  function set_dev_current_component_function(fn) {
    dev_current_component_function = fn;
  }
  function push(props, runes = false, fn) {
    var ctx = component_context = {
      p: component_context,
      c: null,
      d: false,
      e: null,
      m: false,
      s: props,
      x: null,
      l: null
    };
    if (legacy_mode_flag && !runes) {
      component_context.l = {
        s: null,
        u: null,
        r1: [],
        r2: source(false)
      };
    }
    teardown(() => {
      ctx.d = true;
    });
    if (dev_fallback_default) {
      component_context.function = fn;
      dev_current_component_function = fn;
    }
  }
  function pop(component2) {
    const context_stack_item = component_context;
    if (context_stack_item !== null) {
      if (component2 !== void 0) {
        context_stack_item.x = component2;
      }
      const component_effects = context_stack_item.e;
      if (component_effects !== null) {
        var previous_effect = active_effect;
        var previous_reaction = active_reaction;
        context_stack_item.e = null;
        try {
          for (var i = 0; i < component_effects.length; i++) {
            var component_effect = component_effects[i];
            set_active_effect(component_effect.effect);
            set_active_reaction(component_effect.reaction);
            effect(component_effect.fn);
          }
        } finally {
          set_active_effect(previous_effect);
          set_active_reaction(previous_reaction);
        }
      }
      component_context = context_stack_item.p;
      if (dev_fallback_default) {
        dev_current_component_function = context_stack_item.p?.function ?? null;
      }
      context_stack_item.m = true;
    }
    return component2 || /** @type {T} */
    {};
  }
  function is_runes() {
    return !legacy_mode_flag || component_context !== null && component_context.l === null;
  }

  // node_modules/svelte/src/utils.js
  var DOM_BOOLEAN_ATTRIBUTES = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
    "webkitdirectory",
    "defer",
    "disablepictureinpicture",
    "disableremoteplayback"
  ];
  var DOM_PROPERTIES = [
    ...DOM_BOOLEAN_ATTRIBUTES,
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    "readOnly",
    "value",
    "volume",
    "defaultValue",
    "defaultChecked",
    "srcObject",
    "noValidate",
    "allowFullscreen",
    "disablePictureInPicture",
    "disableRemotePlayback"
  ];
  var PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }

  // node_modules/svelte/src/internal/client/dev/elements.js
  function add_locations(fn, filename, locations) {
    return (...args) => {
      const dom = fn(...args);
      var node = hydrating ? dom : dom.nodeType === 11 ? dom.firstChild : dom;
      assign_locations(node, filename, locations);
      return dom;
    };
  }
  function assign_location(element2, filename, location) {
    element2.__svelte_meta = {
      loc: { file: filename, line: location[0], column: location[1] }
    };
    if (location[2]) {
      assign_locations(element2.firstChild, filename, location[2]);
    }
  }
  function assign_locations(node, filename, locations) {
    var i = 0;
    var depth = 0;
    while (node && i < locations.length) {
      if (hydrating && node.nodeType === 8) {
        var comment2 = (
          /** @type {Comment} */
          node
        );
        if (comment2.data === HYDRATION_START || comment2.data === HYDRATION_START_ELSE) depth += 1;
        else if (comment2.data[0] === HYDRATION_END) depth -= 1;
      }
      if (depth === 0 && node.nodeType === 1) {
        assign_location(
          /** @type {Element} */
          node,
          filename,
          locations[i++]
        );
      }
      node = node.nextSibling;
    }
  }

  // node_modules/svelte/src/internal/client/dom/elements/misc.js
  var listening_to_form_reset = false;
  function add_form_reset_listener() {
    if (!listening_to_form_reset) {
      listening_to_form_reset = true;
      document.addEventListener(
        "reset",
        (evt) => {
          Promise.resolve().then(() => {
            if (!evt.defaultPrevented) {
              for (
                const e of
                /**@type {HTMLFormElement} */
                evt.target.elements
              ) {
                e.__on_r?.();
              }
            }
          });
        },
        // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
        { capture: true }
      );
    }
  }

  // node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
  function without_reactive_context(fn) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      return fn();
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function listen_to_event_and_reset_event(element2, event2, handler, on_reset = handler) {
    element2.addEventListener(event2, () => without_reactive_context(handler));
    const prev = element2.__on_r;
    if (prev) {
      element2.__on_r = () => {
        prev();
        on_reset(true);
      };
    } else {
      element2.__on_r = () => on_reset(true);
    }
    add_form_reset_listener();
  }

  // node_modules/svelte/src/internal/client/dom/elements/events.js
  var all_registered_events = /* @__PURE__ */ new Set();
  var root_event_handles = /* @__PURE__ */ new Set();
  function create_event(event_name, dom, handler, options = {}) {
    function target_handler(event2) {
      if (!options.capture) {
        handle_event_propagation.call(dom, event2);
      }
      if (!event2.cancelBubble) {
        return without_reactive_context(() => {
          return handler?.call(this, event2);
        });
      }
    }
    if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
      queue_micro_task(() => {
        dom.addEventListener(event_name, target_handler, options);
      });
    } else {
      dom.addEventListener(event_name, target_handler, options);
    }
    return target_handler;
  }
  function event(event_name, dom, handler, capture, passive2) {
    var options = { capture, passive: passive2 };
    var target_handler = create_event(event_name, dom, handler, options);
    if (dom === document.body || dom === window || dom === document) {
      teardown(() => {
        dom.removeEventListener(event_name, target_handler, options);
      });
    }
  }
  function handle_event_propagation(event2) {
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event2.type;
    var path = event2.composedPath?.() || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event2.target
    );
    var path_idx = 0;
    var handled_at = event2.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event2.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event2.target;
    if (current_target === handler_element) return;
    define_property(event2, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
        current_target.host || null;
        try {
          var delegated = current_target["__" + event_name];
          if (delegated != null && (!/** @type {any} */
          current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          event2.target === current_target)) {
            if (is_array(delegated)) {
              var [fn, ...data] = delegated;
              fn.apply(current_target, [event2, ...data]);
            } else {
              delegated.call(current_target, event2);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
          break;
        }
        current_target = parent_element;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event2.__root = handler_element;
      delete event2.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }

  // node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js
  var head_anchor;
  function reset_head_anchor() {
    head_anchor = void 0;
  }

  // node_modules/svelte/src/internal/client/dom/reconciler.js
  function create_fragment_from_html(html2) {
    var elem = document.createElement("template");
    elem.innerHTML = html2;
    return elem.content;
  }

  // node_modules/svelte/src/internal/client/dom/template.js
  function assign_nodes(start, end) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (effect2.nodes_start === null) {
      effect2.nodes_start = start;
      effect2.nodes_end = end;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function template(content, flags) {
    var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (hydrating) {
        assign_nodes(hydrate_node, null);
        return hydrate_node;
      }
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        if (!is_fragment) node = /** @type {Node} */
        get_first_child(node);
      }
      var clone2 = (
        /** @type {TemplateNode} */
        use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          get_first_child(clone2)
        );
        var end = (
          /** @type {TemplateNode} */
          clone2.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone2, clone2);
      }
      return clone2;
    };
  }
  function text(value = "") {
    if (!hydrating) {
      var t = create_text(value + "");
      assign_nodes(t, t);
      return t;
    }
    var node = hydrate_node;
    if (node.nodeType !== 3) {
      node.before(node = create_text());
      set_hydrate_node(node);
    }
    assign_nodes(node, node);
    return node;
  }
  function comment() {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    var frag = document.createDocumentFragment();
    var start = document.createComment("");
    var anchor = create_text();
    frag.append(start, anchor);
    assign_nodes(start, anchor);
    return frag;
  }
  function append(anchor, dom) {
    if (hydrating) {
      active_effect.nodes_end = hydrate_node;
      hydrate_next();
      return;
    }
    if (anchor === null) {
      return;
    }
    anchor.before(
      /** @type {Node} */
      dom
    );
  }

  // node_modules/svelte/src/internal/client/render.js
  var should_intro = true;
  function set_text(text2, value) {
    var str = value == null ? "" : typeof value === "object" ? value + "" : value;
    if (str !== (text2.__t ??= text2.nodeValue)) {
      text2.__t = str;
      text2.nodeValue = str + "";
    }
  }
  function mount(component2, options) {
    return _mount(component2, options);
  }
  function hydrate(component2, options) {
    init_operations();
    options.intro = options.intro ?? false;
    const target = options.target;
    const was_hydrating = hydrating;
    const previous_hydrate_node = hydrate_node;
    try {
      var anchor = (
        /** @type {TemplateNode} */
        get_first_child(target)
      );
      while (anchor && (anchor.nodeType !== 8 || /** @type {Comment} */
      anchor.data !== HYDRATION_START)) {
        anchor = /** @type {TemplateNode} */
        get_next_sibling(anchor);
      }
      if (!anchor) {
        throw HYDRATION_ERROR;
      }
      set_hydrating(true);
      set_hydrate_node(
        /** @type {Comment} */
        anchor
      );
      hydrate_next();
      const instance = _mount(component2, { ...options, anchor });
      if (hydrate_node === null || hydrate_node.nodeType !== 8 || /** @type {Comment} */
      hydrate_node.data !== HYDRATION_END) {
        hydration_mismatch();
        throw HYDRATION_ERROR;
      }
      set_hydrating(false);
      return (
        /**  @type {Exports} */
        instance
      );
    } catch (error) {
      if (error === HYDRATION_ERROR) {
        if (options.recover === false) {
          hydration_failed();
        }
        init_operations();
        clear_text_content(target);
        set_hydrating(false);
        return mount(component2, options);
      }
      throw error;
    } finally {
      set_hydrating(was_hydrating);
      set_hydrate_node(previous_hydrate_node);
      reset_head_anchor();
    }
  }
  var document_listeners = /* @__PURE__ */ new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
    init_operations();
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive2 = is_passive_event(event_name);
        target.addEventListener(event_name, handle_event_propagation, { passive: passive2 });
        var n = document_listeners.get(event_name);
        if (n === void 0) {
          document.addEventListener(event_name, handle_event_propagation, { passive: passive2 });
          document_listeners.set(event_name, 1);
        } else {
          document_listeners.set(event_name, n + 1);
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    var component2 = void 0;
    var unmount2 = component_root(() => {
      var anchor_node = anchor ?? target.appendChild(create_text());
      branch(() => {
        if (context) {
          push({});
          var ctx = (
            /** @type {ComponentContext} */
            component_context
          );
          ctx.c = context;
        }
        if (events) {
          props.$$events = events;
        }
        if (hydrating) {
          assign_nodes(
            /** @type {TemplateNode} */
            anchor_node,
            null
          );
        }
        should_intro = intro;
        component2 = Component(anchor_node, props) || {};
        should_intro = true;
        if (hydrating) {
          active_effect.nodes_end = hydrate_node;
        }
        if (context) {
          pop();
        }
      });
      return () => {
        for (var event_name of registered_events) {
          target.removeEventListener(event_name, handle_event_propagation);
          var n = (
            /** @type {number} */
            document_listeners.get(event_name)
          );
          if (--n === 0) {
            document.removeEventListener(event_name, handle_event_propagation);
            document_listeners.delete(event_name);
          } else {
            document_listeners.set(event_name, n);
          }
        }
        root_event_handles.delete(event_handle);
        if (anchor_node !== anchor) {
          anchor_node.parentNode?.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component2, unmount2);
    return component2;
  }
  var mounted_components = /* @__PURE__ */ new WeakMap();
  function unmount(component2, options) {
    const fn = mounted_components.get(component2);
    if (fn) {
      mounted_components.delete(component2);
      return fn(options);
    }
    if (dev_fallback_default) {
      lifecycle_double_unmount();
    }
    return Promise.resolve();
  }

  // node_modules/svelte/src/internal/client/dev/legacy.js
  function check_target(target) {
    if (target) {
      component_api_invalid_new(target[FILENAME] ?? "a component", target.name);
    }
  }
  function legacy_api() {
    const component2 = component_context?.function;
    function error(method) {
      const parent = get_component()?.[FILENAME] ?? "Something";
      component_api_changed(parent, method, component2[FILENAME]);
    }
    return {
      $destroy: () => error("$destroy()"),
      $on: () => error("$on(...)"),
      $set: () => error("$set(...)")
    };
  }

  // node_modules/svelte/src/internal/client/dom/blocks/if.js
  function if_block(node, fn, [root_index, hydrate_index] = [0, 0]) {
    if (hydrating && root_index === 0) {
      hydrate_next();
    }
    var anchor = node;
    var consequent_effect = null;
    var alternate_effect = null;
    var condition = UNINITIALIZED;
    var flags = root_index > 0 ? EFFECT_TRANSPARENT : 0;
    var has_branch = false;
    const set_branch = (fn2, flag = true) => {
      has_branch = true;
      update_branch(flag, fn2);
    };
    const update_branch = (new_condition, fn2) => {
      if (condition === (condition = new_condition)) return;
      let mismatch = false;
      if (hydrating && hydrate_index !== -1) {
        if (root_index === 0) {
          const data = (
            /** @type {Comment} */
            anchor.data
          );
          if (data === HYDRATION_START) {
            hydrate_index = 0;
          } else if (data === HYDRATION_START_ELSE) {
            hydrate_index = Infinity;
          } else {
            hydrate_index = parseInt(data.substring(1));
            if (hydrate_index !== hydrate_index) {
              hydrate_index = condition ? Infinity : -1;
            }
          }
        }
        const is_else = hydrate_index > root_index;
        if (!!condition === is_else) {
          anchor = remove_nodes();
          set_hydrate_node(anchor);
          set_hydrating(false);
          mismatch = true;
          hydrate_index = -1;
        }
      }
      if (condition) {
        if (consequent_effect) {
          resume_effect(consequent_effect);
        } else if (fn2) {
          consequent_effect = branch(() => fn2(anchor));
        }
        if (alternate_effect) {
          pause_effect(alternate_effect, () => {
            alternate_effect = null;
          });
        }
      } else {
        if (alternate_effect) {
          resume_effect(alternate_effect);
        } else if (fn2) {
          alternate_effect = branch(() => fn2(anchor, [root_index + 1, hydrate_index]));
        }
        if (consequent_effect) {
          pause_effect(consequent_effect, () => {
            consequent_effect = null;
          });
        }
      }
      if (mismatch) {
        set_hydrating(true);
      }
    };
    block(() => {
      has_branch = false;
      fn(set_branch);
      if (!has_branch) {
        update_branch(null, null);
      }
    }, flags);
    if (hydrating) {
      anchor = hydrate_node;
    }
  }

  // node_modules/svelte/src/internal/client/dom/blocks/each.js
  var current_each_item = null;
  function index(_, i) {
    return i;
  }
  function pause_effects(state2, items, controlled_anchor, items_map) {
    var transitions = [];
    var length = items.length;
    for (var i = 0; i < length; i++) {
      pause_children(items[i].e, transitions, true);
    }
    var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        /** @type {Element} */
        controlled_anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(
        /** @type {Element} */
        controlled_anchor
      );
      items_map.clear();
      link(state2, items[0].prev, items[length - 1].next);
    }
    run_out_transitions(transitions, () => {
      for (var i2 = 0; i2 < length; i2++) {
        var item = items[i2];
        if (!is_controlled) {
          items_map.delete(item.k);
          link(state2, item.prev, item.next);
        }
        destroy_effect(item.e, !is_controlled);
      }
    });
  }
  function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
    var anchor = node;
    var state2 = { flags, items: /* @__PURE__ */ new Map(), first: null };
    var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        node
      );
      anchor = hydrating ? set_hydrate_node(
        /** @type {Comment | Text} */
        get_first_child(parent_node)
      ) : parent_node.appendChild(create_text());
    }
    if (hydrating) {
      hydrate_next();
    }
    var fallback2 = null;
    var was_empty = false;
    var each_array = derived_safe_equal(() => {
      var collection = get_collection();
      return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
    });
    block(() => {
      var array = get(each_array);
      var length = array.length;
      if (was_empty && length === 0) {
        return;
      }
      was_empty = length === 0;
      let mismatch = false;
      if (hydrating) {
        var is_else = (
          /** @type {Comment} */
          anchor.data === HYDRATION_START_ELSE
        );
        if (is_else !== (length === 0)) {
          anchor = remove_nodes();
          set_hydrate_node(anchor);
          set_hydrating(false);
          mismatch = true;
        }
      }
      if (hydrating) {
        var prev = null;
        var item;
        for (var i = 0; i < length; i++) {
          if (hydrate_node.nodeType === 8 && /** @type {Comment} */
          hydrate_node.data === HYDRATION_END) {
            anchor = /** @type {Comment} */
            hydrate_node;
            mismatch = true;
            set_hydrating(false);
            break;
          }
          var value = array[i];
          var key = get_key(value, i);
          item = create_item(
            hydrate_node,
            state2,
            prev,
            null,
            value,
            key,
            i,
            render_fn,
            flags,
            get_collection
          );
          state2.items.set(key, item);
          prev = item;
        }
        if (length > 0) {
          set_hydrate_node(remove_nodes());
        }
      }
      if (!hydrating) {
        reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection);
      }
      if (fallback_fn !== null) {
        if (length === 0) {
          if (fallback2) {
            resume_effect(fallback2);
          } else {
            fallback2 = branch(() => fallback_fn(anchor));
          }
        } else if (fallback2 !== null) {
          pause_effect(fallback2, () => {
            fallback2 = null;
          });
        }
      }
      if (mismatch) {
        set_hydrating(true);
      }
      get(each_array);
    });
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection) {
    var is_animated = (flags & EACH_IS_ANIMATED) !== 0;
    var should_update = (flags & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0;
    var length = array.length;
    var items = state2.items;
    var first = state2.first;
    var current = first;
    var seen;
    var prev = null;
    var to_animate;
    var matched = [];
    var stashed = [];
    var value;
    var key;
    var item;
    var i;
    if (is_animated) {
      for (i = 0; i < length; i += 1) {
        value = array[i];
        key = get_key(value, i);
        item = items.get(key);
        if (item !== void 0) {
          item.a?.measure();
          (to_animate ??= /* @__PURE__ */ new Set()).add(item);
        }
      }
    }
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      item = items.get(key);
      if (item === void 0) {
        var child_anchor = current ? (
          /** @type {TemplateNode} */
          current.e.nodes_start
        ) : anchor;
        prev = create_item(
          child_anchor,
          state2,
          prev,
          prev === null ? state2.first : prev.next,
          value,
          key,
          i,
          render_fn,
          flags,
          get_collection
        );
        items.set(key, prev);
        matched = [];
        stashed = [];
        current = prev.next;
        continue;
      }
      if (should_update) {
        update_item(item, value, i, flags);
      }
      if ((item.e.f & INERT) !== 0) {
        resume_effect(item.e);
        if (is_animated) {
          item.a?.unfix();
          (to_animate ??= /* @__PURE__ */ new Set()).delete(item);
        }
      }
      if (item !== current) {
        if (seen !== void 0 && seen.has(item)) {
          if (matched.length < stashed.length) {
            var start = stashed[0];
            var j;
            prev = start.prev;
            var a = matched[0];
            var b = matched[matched.length - 1];
            for (j = 0; j < matched.length; j += 1) {
              move(matched[j], start, anchor);
            }
            for (j = 0; j < stashed.length; j += 1) {
              seen.delete(stashed[j]);
            }
            link(state2, a.prev, b.next);
            link(state2, prev, a);
            link(state2, b, start);
            current = start;
            prev = b;
            i -= 1;
            matched = [];
            stashed = [];
          } else {
            seen.delete(item);
            move(item, current, anchor);
            link(state2, item.prev, item.next);
            link(state2, item, prev === null ? state2.first : prev.next);
            link(state2, prev, item);
            prev = item;
          }
          continue;
        }
        matched = [];
        stashed = [];
        while (current !== null && current.k !== key) {
          if ((current.e.f & INERT) === 0) {
            (seen ??= /* @__PURE__ */ new Set()).add(current);
          }
          stashed.push(current);
          current = current.next;
        }
        if (current === null) {
          continue;
        }
        item = current;
      }
      matched.push(item);
      prev = item;
      current = item.next;
    }
    if (current !== null || seen !== void 0) {
      var to_destroy = seen === void 0 ? [] : array_from(seen);
      while (current !== null) {
        if ((current.e.f & INERT) === 0) {
          to_destroy.push(current);
        }
        current = current.next;
      }
      var destroy_length = to_destroy.length;
      if (destroy_length > 0) {
        var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
        if (is_animated) {
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].a?.measure();
          }
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].a?.fix();
          }
        }
        pause_effects(state2, to_destroy, controlled_anchor, items);
      }
    }
    if (is_animated) {
      queue_micro_task(() => {
        if (to_animate === void 0) return;
        for (item of to_animate) {
          item.a?.apply();
        }
      });
    }
    active_effect.first = state2.first && state2.first.e;
    active_effect.last = prev && prev.e;
  }
  function update_item(item, value, index2, type) {
    if ((type & EACH_ITEM_REACTIVE) !== 0) {
      internal_set(item.v, value);
    }
    if ((type & EACH_INDEX_REACTIVE) !== 0) {
      internal_set(
        /** @type {Value<number>} */
        item.i,
        index2
      );
    } else {
      item.i = index2;
    }
  }
  function create_item(anchor, state2, prev, next2, value, key, index2, render_fn, flags, get_collection) {
    var previous_each_item = current_each_item;
    var reactive = (flags & EACH_ITEM_REACTIVE) !== 0;
    var mutable = (flags & EACH_ITEM_IMMUTABLE) === 0;
    var v = reactive ? mutable ? mutable_source(value) : source(value) : value;
    var i = (flags & EACH_INDEX_REACTIVE) === 0 ? index2 : source(index2);
    if (dev_fallback_default && reactive) {
      v.debug = () => {
        var collection_index = typeof i === "number" ? index2 : i.v;
        get_collection()[collection_index];
      };
    }
    var item = {
      i,
      v,
      k: key,
      a: null,
      // @ts-expect-error
      e: null,
      prev,
      next: next2
    };
    current_each_item = item;
    try {
      item.e = branch(() => render_fn(anchor, v, i, get_collection), hydrating);
      item.e.prev = prev && prev.e;
      item.e.next = next2 && next2.e;
      if (prev === null) {
        state2.first = item;
      } else {
        prev.next = item;
        prev.e.next = item.e;
      }
      if (next2 !== null) {
        next2.prev = item;
        next2.e.prev = item.e;
      }
      return item;
    } finally {
      current_each_item = previous_each_item;
    }
  }
  function move(item, next2, anchor) {
    var end = item.next ? (
      /** @type {TemplateNode} */
      item.next.e.nodes_start
    ) : anchor;
    var dest = next2 ? (
      /** @type {TemplateNode} */
      next2.e.nodes_start
    ) : anchor;
    var node = (
      /** @type {TemplateNode} */
      item.e.nodes_start
    );
    while (node !== end) {
      var next_node = (
        /** @type {TemplateNode} */
        get_next_sibling(node)
      );
      dest.before(node);
      node = next_node;
    }
  }
  function link(state2, prev, next2) {
    if (prev === null) {
      state2.first = next2;
    } else {
      prev.next = next2;
      prev.e.next = next2 && next2.e;
    }
    if (next2 !== null) {
      next2.prev = prev;
      next2.e.prev = prev && prev.e;
    }
  }

  // node_modules/svelte/src/internal/shared/attributes.js
  var whitespace = [..." 	\n\r\f\xA0\v\uFEFF"];
  function to_class(value, hash2, directives) {
    var classname = value == null ? "" : "" + value;
    if (hash2) {
      classname = classname ? classname + " " + hash2 : hash2;
    }
    if (directives) {
      for (var key in directives) {
        if (directives[key]) {
          classname = classname ? classname + " " + key : key;
        } else if (classname.length) {
          var len = key.length;
          var a = 0;
          while ((a = classname.indexOf(key, a)) >= 0) {
            var b = a + len;
            if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
              classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
            } else {
              a = b;
            }
          }
        }
      }
    }
    return classname === "" ? null : classname;
  }
  function append_styles(styles, important = false) {
    var separator = important ? " !important;" : ";";
    var css = "";
    for (var key in styles) {
      var value = styles[key];
      if (value != null && value !== "") {
        css += " " + key + ": " + value + separator;
      }
    }
    return css;
  }
  function to_css_name(name) {
    if (name[0] !== "-" || name[1] !== "-") {
      return name.toLowerCase();
    }
    return name;
  }
  function to_style(value, styles) {
    if (styles) {
      var new_style = "";
      var normal_styles;
      var important_styles;
      if (Array.isArray(styles)) {
        normal_styles = styles[0];
        important_styles = styles[1];
      } else {
        normal_styles = styles;
      }
      if (value) {
        value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
        var in_str = false;
        var in_apo = 0;
        var in_comment = false;
        var reserved_names = [];
        if (normal_styles) {
          reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
        }
        if (important_styles) {
          reserved_names.push(...Object.keys(important_styles).map(to_css_name));
        }
        var start_index = 0;
        var name_index = -1;
        const len = value.length;
        for (var i = 0; i < len; i++) {
          var c = value[i];
          if (in_comment) {
            if (c === "/" && value[i - 1] === "*") {
              in_comment = false;
            }
          } else if (in_str) {
            if (in_str === c) {
              in_str = false;
            }
          } else if (c === "/" && value[i + 1] === "*") {
            in_comment = true;
          } else if (c === '"' || c === "'") {
            in_str = c;
          } else if (c === "(") {
            in_apo++;
          } else if (c === ")") {
            in_apo--;
          }
          if (!in_comment && in_str === false && in_apo === 0) {
            if (c === ":" && name_index === -1) {
              name_index = i;
            } else if (c === ";" || i === len - 1) {
              if (name_index !== -1) {
                var name = to_css_name(value.substring(start_index, name_index).trim());
                if (!reserved_names.includes(name)) {
                  if (c !== ";") {
                    i++;
                  }
                  var property = value.substring(start_index, i).trim();
                  new_style += " " + property + ";";
                }
              }
              start_index = i + 1;
              name_index = -1;
            }
          }
        }
      }
      if (normal_styles) {
        new_style += append_styles(normal_styles);
      }
      if (important_styles) {
        new_style += append_styles(important_styles, true);
      }
      new_style = new_style.trim();
      return new_style === "" ? null : new_style;
    }
    return value == null ? null : String(value);
  }

  // node_modules/svelte/src/internal/client/dom/elements/class.js
  function set_class(dom, is_html, value, hash2, prev_classes, next_classes) {
    var prev = dom.__className;
    if (hydrating || prev !== value) {
      var next_class_name = to_class(value, hash2, next_classes);
      if (!hydrating || next_class_name !== dom.getAttribute("class")) {
        if (next_class_name == null) {
          dom.removeAttribute("class");
        } else if (is_html) {
          dom.className = next_class_name;
        } else {
          dom.setAttribute("class", next_class_name);
        }
      }
      dom.__className = value;
    } else if (next_classes && prev_classes !== next_classes) {
      for (var key in next_classes) {
        var is_present = !!next_classes[key];
        if (prev_classes == null || is_present !== !!prev_classes[key]) {
          dom.classList.toggle(key, is_present);
        }
      }
    }
    return next_classes;
  }

  // node_modules/svelte/src/internal/client/dom/elements/style.js
  function update_styles(dom, prev = {}, next2, priority) {
    for (var key in next2) {
      var value = next2[key];
      if (prev[key] !== value) {
        if (next2[key] == null) {
          dom.style.removeProperty(key);
        } else {
          dom.style.setProperty(key, value, priority);
        }
      }
    }
  }
  function set_style(dom, value, prev_styles, next_styles) {
    var prev = dom.__style;
    if (hydrating || prev !== value) {
      var next_style_attr = to_style(value, next_styles);
      if (!hydrating || next_style_attr !== dom.getAttribute("style")) {
        if (next_style_attr == null) {
          dom.removeAttribute("style");
        } else {
          dom.style.cssText = next_style_attr;
        }
      }
      dom.__style = value;
    } else if (next_styles) {
      if (Array.isArray(next_styles)) {
        update_styles(dom, prev_styles?.[0], next_styles[0]);
        update_styles(dom, prev_styles?.[1], next_styles[1], "important");
      } else {
        update_styles(dom, prev_styles, next_styles);
      }
    }
    return next_styles;
  }

  // node_modules/svelte/src/internal/client/dom/elements/attributes.js
  var CLASS = Symbol("class");
  var STYLE = Symbol("style");
  var IS_CUSTOM_ELEMENT = Symbol("is custom element");
  var IS_HTML = Symbol("is html");
  function set_value(element2, value) {
    var attributes = get_attributes(element2);
    if (attributes.value === (attributes.value = // treat null and undefined the same for the initial value
    value ?? void 0) || // @ts-expect-error
    // `progress` elements always need their value set when it's `0`
    element2.value === value && (value !== 0 || element2.nodeName !== "PROGRESS")) {
      return;
    }
    element2.value = value ?? "";
  }
  function set_attribute(element2, attribute, value, skip_warning) {
    var attributes = get_attributes(element2);
    if (hydrating) {
      attributes[attribute] = element2.getAttribute(attribute);
      if (attribute === "src" || attribute === "srcset" || attribute === "href" && element2.nodeName === "LINK") {
        if (!skip_warning) {
          check_src_in_dev_hydration(element2, attribute, value ?? "");
        }
        return;
      }
    }
    if (attributes[attribute] === (attributes[attribute] = value)) return;
    if (attribute === "loading") {
      element2[LOADING_ATTR_SYMBOL] = value;
    }
    if (value == null) {
      element2.removeAttribute(attribute);
    } else if (typeof value !== "string" && get_setters(element2).includes(attribute)) {
      element2[attribute] = value;
    } else {
      element2.setAttribute(attribute, value);
    }
  }
  function get_attributes(element2) {
    return (
      /** @type {Record<string | symbol, unknown>} **/
      // @ts-expect-error
      element2.__attributes ??= {
        [IS_CUSTOM_ELEMENT]: element2.nodeName.includes("-"),
        [IS_HTML]: element2.namespaceURI === NAMESPACE_HTML
      }
    );
  }
  var setters_cache = /* @__PURE__ */ new Map();
  function get_setters(element2) {
    var setters = setters_cache.get(element2.nodeName);
    if (setters) return setters;
    setters_cache.set(element2.nodeName, setters = []);
    var descriptors;
    var proto = element2;
    var element_proto = Element.prototype;
    while (element_proto !== proto) {
      descriptors = get_descriptors(proto);
      for (var key in descriptors) {
        if (descriptors[key].set) {
          setters.push(key);
        }
      }
      proto = get_prototype_of(proto);
    }
    return setters;
  }
  function check_src_in_dev_hydration(element2, attribute, value) {
    if (!dev_fallback_default) return;
    if (attribute === "srcset" && srcset_url_equal(element2, value)) return;
    if (src_url_equal(element2.getAttribute(attribute) ?? "", value)) return;
    hydration_attribute_changed(
      attribute,
      element2.outerHTML.replace(element2.innerHTML, element2.innerHTML && "..."),
      String(value)
    );
  }
  function src_url_equal(element_src, url) {
    if (element_src === url) return true;
    return new URL(element_src, document.baseURI).href === new URL(url, document.baseURI).href;
  }
  function split_srcset(srcset) {
    return srcset.split(",").map((src) => src.trim().split(" ").filter(Boolean));
  }
  function srcset_url_equal(element2, srcset) {
    var element_urls = split_srcset(element2.srcset);
    var urls = split_srcset(srcset);
    return urls.length === element_urls.length && urls.every(
      ([url, width], i) => width === element_urls[i][1] && // We need to test both ways because Vite will create an a full URL with
      // `new URL(asset, import.meta.url).href` for the client when `base: './'`, and the
      // relative URLs inside srcset are not automatically resolved to absolute URLs by
      // browsers (in contrast to img.src). This means both SSR and DOM code could
      // contain relative or absolute URLs.
      (src_url_equal(element_urls[i][0], url) || src_url_equal(url, element_urls[i][0]))
    );
  }

  // node_modules/svelte/src/internal/client/dom/elements/bindings/props.js
  function bind_prop(props, prop2, value) {
    var desc = get_descriptor(props, prop2);
    if (desc && desc.set) {
      props[prop2] = value;
      teardown(() => {
        props[prop2] = null;
      });
    }
  }

  // node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
  function select_option(select, value, mounting) {
    if (select.multiple) {
      return select_options(select, value);
    }
    for (var option of select.options) {
      var option_value = get_option_value(option);
      if (is(option_value, value)) {
        option.selected = true;
        return;
      }
    }
    if (!mounting || value !== void 0) {
      select.selectedIndex = -1;
    }
  }
  function init_select(select, get_value) {
    let mounting = true;
    effect(() => {
      if (get_value) {
        select_option(select, untrack(get_value), mounting);
      }
      mounting = false;
      var observer = new MutationObserver(() => {
        var value = select.__value;
        select_option(select, value);
      });
      observer.observe(select, {
        // Listen to option element changes
        childList: true,
        subtree: true,
        // because of <optgroup>
        // Listen to option element value attribute changes
        // (doesn't get notified of select value changes,
        // because that property is not reflected as an attribute)
        attributes: true,
        attributeFilter: ["value"]
      });
      return () => {
        observer.disconnect();
      };
    });
  }
  function bind_select_value(select, get3, set2 = get3) {
    var mounting = true;
    listen_to_event_and_reset_event(select, "change", (is_reset) => {
      var query = is_reset ? "[selected]" : ":checked";
      var value;
      if (select.multiple) {
        value = [].map.call(select.querySelectorAll(query), get_option_value);
      } else {
        var selected_option = select.querySelector(query) ?? // will fall back to first non-disabled option if no option is selected
        select.querySelector("option:not([disabled])");
        value = selected_option && get_option_value(selected_option);
      }
      set2(value);
    });
    effect(() => {
      var value = get3();
      select_option(select, value, mounting);
      if (mounting && value === void 0) {
        var selected_option = select.querySelector(":checked");
        if (selected_option !== null) {
          value = get_option_value(selected_option);
          set2(value);
        }
      }
      select.__value = value;
      mounting = false;
    });
    init_select(select);
  }
  function select_options(select, value) {
    for (var option of select.options) {
      option.selected = ~value.indexOf(get_option_value(option));
    }
  }
  function get_option_value(option) {
    if ("__value" in option) {
      return option.__value;
    } else {
      return option.value;
    }
  }

  // node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
  function is_bound_this(bound_value, element_or_component) {
    return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
  }
  function bind_this(element_or_component = {}, update2, get_value, get_parts) {
    effect(() => {
      var old_parts;
      var parts;
      render_effect(() => {
        old_parts = parts;
        parts = get_parts?.() || [];
        untrack(() => {
          if (element_or_component !== get_value(...parts)) {
            update2(element_or_component, ...parts);
            if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
              update2(null, ...old_parts);
            }
          }
        });
      });
      return () => {
        queue_micro_task(() => {
          if (parts && is_bound_this(get_value(...parts), element_or_component)) {
            update2(null, ...parts);
          }
        });
      };
    });
    return element_or_component;
  }

  // node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
  function init(immutable = false) {
    const context = (
      /** @type {ComponentContextLegacy} */
      component_context
    );
    const callbacks = context.l.u;
    if (!callbacks) return;
    let props = () => deep_read_state(context.s);
    if (immutable) {
      let version = 0;
      let prev = (
        /** @type {Record<string, any>} */
        {}
      );
      const d = derived(() => {
        let changed = false;
        const props2 = context.s;
        for (const key in props2) {
          if (props2[key] !== prev[key]) {
            prev[key] = props2[key];
            changed = true;
          }
        }
        if (changed) version++;
        return version;
      });
      props = () => get(d);
    }
    if (callbacks.b.length) {
      user_pre_effect(() => {
        observe_all(context, props);
        run_all(callbacks.b);
      });
    }
    user_effect(() => {
      const fns = untrack(() => callbacks.m.map(run));
      return () => {
        for (const fn of fns) {
          if (typeof fn === "function") {
            fn();
          }
        }
      };
    });
    if (callbacks.a.length) {
      user_effect(() => {
        observe_all(context, props);
        run_all(callbacks.a);
      });
    }
  }
  function observe_all(context, props) {
    if (context.l.s) {
      for (const signal of context.l.s) get(signal);
    }
    props();
  }

  // node_modules/svelte/src/index-client.js
  if (dev_fallback_default) {
    let throw_rune_error = function(rune) {
      if (!(rune in globalThis)) {
        let value;
        Object.defineProperty(globalThis, rune, {
          configurable: true,
          // eslint-disable-next-line getter-return
          get: () => {
            if (value !== void 0) {
              return value;
            }
            rune_outside_svelte(rune);
          },
          set: (v) => {
            value = v;
          }
        });
      }
    };
    throw_rune_error("$state");
    throw_rune_error("$effect");
    throw_rune_error("$derived");
    throw_rune_error("$inspect");
    throw_rune_error("$props");
    throw_rune_error("$bindable");
  }
  function onMount(fn) {
    if (component_context === null) {
      lifecycle_outside_component("onMount");
    }
    if (legacy_mode_flag && component_context.l !== null) {
      init_update_callbacks(component_context).m.push(fn);
    } else {
      user_effect(() => {
        const cleanup = untrack(fn);
        if (typeof cleanup === "function") return (
          /** @type {() => void} */
          cleanup
        );
      });
    }
  }
  function onDestroy(fn) {
    if (component_context === null) {
      lifecycle_outside_component("onDestroy");
    }
    onMount(() => () => untrack(fn));
  }
  function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    return new CustomEvent(type, { detail, bubbles, cancelable });
  }
  function createEventDispatcher() {
    const active_component_context = component_context;
    if (active_component_context === null) {
      lifecycle_outside_component("createEventDispatcher");
    }
    return (type, detail, options) => {
      const events = (
        /** @type {Record<string, Function | Function[]>} */
        active_component_context.s.$$events?.[
          /** @type {any} */
          type
        ]
      );
      if (events) {
        const callbacks = is_array(events) ? events.slice() : [events];
        const event2 = create_custom_event(
          /** @type {string} */
          type,
          detail,
          options
        );
        for (const fn of callbacks) {
          fn.call(active_component_context.x, event2);
        }
        return !event2.defaultPrevented;
      }
      return true;
    };
  }
  function init_update_callbacks(context) {
    var l = (
      /** @type {ComponentContextLegacy} */
      context.l
    );
    return l.u ??= { a: [], b: [], m: [] };
  }

  // node_modules/svelte/src/store/utils.js
  function subscribe_to_store(store, run2, invalidate) {
    if (store == null) {
      run2(void 0);
      if (invalidate) invalidate(void 0);
      return noop;
    }
    const unsub = untrack(
      () => store.subscribe(
        run2,
        // @ts-expect-error
        invalidate
      )
    );
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }

  // node_modules/svelte/src/store/shared/index.js
  var subscriber_queue = [];
  function writable(value, start = noop) {
    let stop = null;
    const subscribers = /* @__PURE__ */ new Set();
    function set2(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          const run_queue = !subscriber_queue.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update2(fn) {
      set2(fn(
        /** @type {T} */
        value
      ));
    }
    function subscribe(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop = start(set2, update2) || noop;
      }
      run2(
        /** @type {T} */
        value
      );
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0 && stop) {
          stop();
          stop = null;
        }
      };
    }
    return { set: set2, update: update2, subscribe };
  }
  function get2(store) {
    let value;
    subscribe_to_store(store, (_) => value = _)();
    return value;
  }

  // node_modules/svelte/src/internal/client/reactivity/store.js
  var is_store_binding = false;
  var IS_UNMOUNTED = Symbol();
  function store_get(store, store_name, stores) {
    const entry = stores[store_name] ??= {
      store: null,
      source: mutable_source(void 0),
      unsubscribe: noop
    };
    if (entry.store !== store && !(IS_UNMOUNTED in stores)) {
      entry.unsubscribe();
      entry.store = store ?? null;
      if (store == null) {
        entry.source.v = void 0;
        entry.unsubscribe = noop;
      } else {
        var is_synchronous_callback = true;
        entry.unsubscribe = subscribe_to_store(store, (v) => {
          if (is_synchronous_callback) {
            entry.source.v = v;
          } else {
            set(entry.source, v);
          }
        });
        is_synchronous_callback = false;
      }
    }
    if (store && IS_UNMOUNTED in stores) {
      return get2(store);
    }
    return get(entry.source);
  }
  function setup_stores() {
    const stores = {};
    function cleanup() {
      teardown(() => {
        for (var store_name in stores) {
          const ref = stores[store_name];
          ref.unsubscribe();
        }
        define_property(stores, IS_UNMOUNTED, {
          enumerable: false,
          value: true
        });
      });
    }
    return [stores, cleanup];
  }
  function capture_store_binding(fn) {
    var previous_is_store_binding = is_store_binding;
    try {
      is_store_binding = false;
      return [fn(), is_store_binding];
    } finally {
      is_store_binding = previous_is_store_binding;
    }
  }

  // node_modules/svelte/src/internal/client/reactivity/props.js
  function has_destroyed_component_ctx(current_value) {
    return current_value.ctx?.d ?? false;
  }
  function prop(props, key, flags, fallback2) {
    var immutable = (flags & PROPS_IS_IMMUTABLE) !== 0;
    var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
    var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
    var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;
    var is_store_sub = false;
    var prop_value;
    if (bindable) {
      [prop_value, is_store_sub] = capture_store_binding(() => (
        /** @type {V} */
        props[key]
      ));
    } else {
      prop_value = /** @type {V} */
      props[key];
    }
    var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
    var setter = bindable && (get_descriptor(props, key)?.set ?? (is_entry_props && key in props && ((v) => props[key] = v))) || void 0;
    var fallback_value = (
      /** @type {V} */
      fallback2
    );
    var fallback_dirty = true;
    var fallback_used = false;
    var get_fallback = () => {
      fallback_used = true;
      if (fallback_dirty) {
        fallback_dirty = false;
        if (lazy) {
          fallback_value = untrack(
            /** @type {() => V} */
            fallback2
          );
        } else {
          fallback_value = /** @type {V} */
          fallback2;
        }
      }
      return fallback_value;
    };
    if (prop_value === void 0 && fallback2 !== void 0) {
      if (setter && runes) {
        props_invalid_value(key);
      }
      prop_value = get_fallback();
      if (setter) setter(prop_value);
    }
    var getter;
    if (runes) {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key]
        );
        if (value === void 0) return get_fallback();
        fallback_dirty = true;
        fallback_used = false;
        return value;
      };
    } else {
      var derived_getter = (immutable ? derived : derived_safe_equal)(
        () => (
          /** @type {V} */
          props[key]
        )
      );
      derived_getter.f |= LEGACY_DERIVED_PROP;
      getter = () => {
        var value = get(derived_getter);
        if (value !== void 0) fallback_value = /** @type {V} */
        void 0;
        return value === void 0 ? fallback_value : value;
      };
    }
    if ((flags & PROPS_IS_UPDATED) === 0) {
      return getter;
    }
    if (setter) {
      var legacy_parent = props.$$legacy;
      return function(value, mutation) {
        if (arguments.length > 0) {
          if (!runes || !mutation || legacy_parent || is_store_sub) {
            setter(mutation ? getter() : value);
          }
          return value;
        } else {
          return getter();
        }
      };
    }
    var from_child = false;
    var was_from_child = false;
    var inner_current_value = mutable_source(prop_value);
    var current_value = derived(() => {
      var parent_value = getter();
      var child_value = get(inner_current_value);
      if (from_child) {
        from_child = false;
        was_from_child = true;
        return child_value;
      }
      was_from_child = false;
      return inner_current_value.v = parent_value;
    });
    if (bindable) {
      get(current_value);
    }
    if (!immutable) current_value.equals = safe_equals;
    return function(value, mutation) {
      if (captured_signals !== null) {
        from_child = was_from_child;
        getter();
        get(inner_current_value);
      }
      if (arguments.length > 0) {
        const new_value = mutation ? get(current_value) : runes && bindable ? proxy(value) : value;
        if (!current_value.equals(new_value)) {
          from_child = true;
          set(inner_current_value, new_value);
          if (fallback_used && fallback_value !== void 0) {
            fallback_value = new_value;
          }
          if (has_destroyed_component_ctx(current_value)) {
            return value;
          }
          untrack(() => get(current_value));
        }
        return value;
      }
      if (has_destroyed_component_ctx(current_value)) {
        return current_value.v;
      }
      return get(current_value);
    };
  }

  // node_modules/svelte/src/internal/client/validate.js
  function validate_each_keys(collection, key_fn) {
    render_effect(() => {
      const keys = /* @__PURE__ */ new Map();
      const maybe_array = collection();
      const array = is_array(maybe_array) ? maybe_array : maybe_array == null ? [] : Array.from(maybe_array);
      const length = array.length;
      for (let i = 0; i < length; i++) {
        const key = key_fn(array[i], i);
        if (keys.has(key)) {
          const a = String(keys.get(key));
          const b = String(i);
          let k = String(key);
          if (k.startsWith("[object ")) k = null;
          each_key_duplicate(a, b, k);
        }
        keys.set(key, i);
      }
    });
  }

  // node_modules/svelte/src/legacy/legacy-client.js
  function createClassComponent(options) {
    return new Svelte4Component(options);
  }
  var Svelte4Component = class {
    /** @type {any} */
    #events;
    /** @type {Record<string, any>} */
    #instance;
    /**
     * @param {ComponentConstructorOptions & {
     *  component: any;
     * }} options
     */
    constructor(options) {
      var sources = /* @__PURE__ */ new Map();
      var add_source = (key, value) => {
        var s = mutable_source(value);
        sources.set(key, s);
        return s;
      };
      const props = new Proxy(
        { ...options.props || {}, $$events: {} },
        {
          get(target, prop2) {
            return get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
          },
          has(target, prop2) {
            if (prop2 === LEGACY_PROPS) return true;
            get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
            return Reflect.has(target, prop2);
          },
          set(target, prop2, value) {
            set(sources.get(prop2) ?? add_source(prop2, value), value);
            return Reflect.set(target, prop2, value);
          }
        }
      );
      this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
        target: options.target,
        anchor: options.anchor,
        props,
        context: options.context,
        intro: options.intro ?? false,
        recover: options.recover
      });
      if (!options?.props?.$$host || options.sync === false) {
        flushSync();
      }
      this.#events = props.$$events;
      for (const key of Object.keys(this.#instance)) {
        if (key === "$set" || key === "$destroy" || key === "$on") continue;
        define_property(this, key, {
          get() {
            return this.#instance[key];
          },
          /** @param {any} value */
          set(value) {
            this.#instance[key] = value;
          },
          enumerable: true
        });
      }
      this.#instance.$set = /** @param {Record<string, any>} next */
      (next2) => {
        Object.assign(props, next2);
      };
      this.#instance.$destroy = () => {
        unmount(this.#instance);
      };
    }
    /** @param {Record<string, any>} props */
    $set(props) {
      this.#instance.$set(props);
    }
    /**
     * @param {string} event
     * @param {(...args: any[]) => any} callback
     * @returns {any}
     */
    $on(event2, callback) {
      this.#events[event2] = this.#events[event2] || [];
      const cb = (...args) => callback.call(this, ...args);
      this.#events[event2].push(cb);
      return () => {
        this.#events[event2] = this.#events[event2].filter(
          /** @param {any} fn */
          (fn) => fn !== cb
        );
      };
    }
    $destroy() {
      this.#instance.$destroy();
    }
  };

  // node_modules/svelte/src/internal/client/dom/elements/custom-element.js
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /** The Svelte component constructor */
      $$ctor;
      /** Slots */
      $$s;
      /** @type {any} The Svelte component instance */
      $$c;
      /** Whether or not the custom element is connected */
      $$cn = false;
      /** @type {Record<string, any>} Component props data */
      $$d = {};
      /** `true` if currently in the process of reflecting component props back to attributes */
      $$r = false;
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      $$p_d = {};
      /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
      $$l = {};
      /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
      $$l_u = /* @__PURE__ */ new Map();
      /** @type {any} The managed render effect for reflecting attributes */
      $$me;
      /**
       * @param {*} $$componentCtor
       * @param {*} $$slots
       * @param {*} use_shadow_dom
       */
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      /**
       * @param {string} type
       * @param {EventListenerOrEventListenerObject} listener
       * @param {boolean | AddEventListenerOptions} [options]
       */
      addEventListener(type, listener, options) {
        this.$$l[type] = this.$$l[type] || [];
        this.$$l[type].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type, listener, options);
      }
      /**
       * @param {string} type
       * @param {EventListenerOrEventListenerObject} listener
       * @param {boolean | AddEventListenerOptions} [options]
       */
      removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      async connectedCallback() {
        this.$$cn = true;
        if (!this.$$c) {
          let create_slot = function(name) {
            return (anchor) => {
              const slot2 = document.createElement("slot");
              if (name !== "default") slot2.name = name;
              append(anchor, slot2);
            };
          };
          await Promise.resolve();
          if (!this.$$cn || this.$$c) {
            return;
          }
          const $$slots = {};
          const existing_slots = get_custom_elements_slots(this);
          for (const name of this.$$s) {
            if (name in existing_slots) {
              if (name === "default" && !this.$$d.children) {
                this.$$d.children = create_slot(name);
                $$slots.default = true;
              } else {
                $$slots[name] = create_slot(name);
              }
            }
          }
          for (const attribute of this.attributes) {
            const name = this.$$g_p(attribute.name);
            if (!(name in this.$$d)) {
              this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
            }
          }
          for (const key in this.$$p_d) {
            if (!(key in this.$$d) && this[key] !== void 0) {
              this.$$d[key] = this[key];
              delete this[key];
            }
          }
          this.$$c = createClassComponent({
            component: this.$$ctor,
            target: this.shadowRoot || this,
            props: {
              ...this.$$d,
              $$slots,
              $$host: this
            }
          });
          this.$$me = effect_root(() => {
            render_effect(() => {
              this.$$r = true;
              for (const key of object_keys(this.$$c)) {
                if (!this.$$p_d[key]?.reflect) continue;
                this.$$d[key] = this.$$c[key];
                const attribute_value = get_custom_element_value(
                  key,
                  this.$$d[key],
                  this.$$p_d,
                  "toAttribute"
                );
                if (attribute_value == null) {
                  this.removeAttribute(this.$$p_d[key].attribute || key);
                } else {
                  this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                }
              }
              this.$$r = false;
            });
          });
          for (const type in this.$$l) {
            for (const listener of this.$$l[type]) {
              const unsub = this.$$c.$on(type, listener);
              this.$$l_u.set(listener, unsub);
            }
          }
          this.$$l = {};
        }
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      /**
       * @param {string} attr
       * @param {string} _oldValue
       * @param {string} newValue
       */
      attributeChangedCallback(attr2, _oldValue, newValue) {
        if (this.$$r) return;
        attr2 = this.$$g_p(attr2);
        this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
        this.$$c?.$set({ [attr2]: this.$$d[attr2] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn && this.$$c) {
            this.$$c.$destroy();
            this.$$me();
            this.$$c = void 0;
          }
        });
      }
      /**
       * @param {string} attribute_name
       */
      $$g_p(attribute_name) {
        return object_keys(this.$$p_d).find(
          (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop2, value, props_definition, transform) {
    const type = props_definition[prop2]?.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop2]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        // conversion already handled above
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach((node) => {
      result[
        /** @type {Element} node */
        node.slot || "default"
      ] = true;
    });
    return result;
  }

  // node_modules/svelte/src/internal/shared/validate.js
  function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== "function") {
      store_invalid_shape(name);
    }
  }

  // node_modules/svelte/src/internal/client/dev/console-log.js
  function log_if_contains_state(method, ...objects) {
    untrack(() => {
      try {
        let has_state = false;
        const transformed = [];
        for (const obj of objects) {
          if (obj && typeof obj === "object" && STATE_SYMBOL in obj) {
            transformed.push(snapshot(obj, true));
            has_state = true;
          } else {
            transformed.push(obj);
          }
        }
        if (has_state) {
          console_log_state(method);
          console.log("%c[snapshot]", "color: grey", ...transformed);
        }
      } catch {
      }
    });
    return objects;
  }

  // src/svelte/config.js
  var DEBUG = {
    TESTING_MODE: false,
    STARTING_POINTS: 1e4,
    UNLOCK_ALL_TEA: false,
    // Optional: unlock all tea types
    EXTRA_PLOTS: 3,
    // Optional: start with extra garden plots
    EXTRA_TEAPOTS: 1
    // Optional: start with extra teapots
  };
  var TIMINGS = {
    // Growing
    GARDEN_COOLDOWN: 3e3,
    // 3 second cooldown for planting
    // Harvest
    HARVEST_TIME: 5e3,
    // 5 seconds to harvest
    HARVEST_COOLDOWN: 3e3,
    // 3 second cooldown for harvesting
    // Brewing
    BREWMASTER_COOLDOWN: 3e3,
    // 3 second cooldown for brewmasters
    // Serving
    SERVE_COOLDOWN: 3e3,
    // 3 second cooldown for serving
    // Time cycles
    QUARTER_DURATION: 6e4
    // 1 minute per day quarter
  };
  var POINTS = {
    BASE: 5,
    CAFE_SPRITE_BONUS: 1
  };
  var MAX_LIMITS = {
    GARDEN_PLOTS: 24,
    TEAPOTS: 12,
    SPRITES: {
      garden: 24,
      harvest: 24,
      brewmaster: 12,
      cafe: 10
    }
  };
  var PRICES = {
    BASE: {
      GARDEN_PLOT: 10,
      TEAPOT: 40,
      SPRITE: {
        GARDEN: 25,
        HARVEST: 50,
        BREWMASTER: 75,
        CAFE: 500
      }
    },
    // How much prices increase with each purchase (1.2 = 20% increase)
    MULTIPLIER: 1.2
  };
  var TEA = {
    green: {
      name: "Green Tea",
      growTime: 12e3,
      brewTime: 7e3,
      pointValue: 5,
      cost: 0
    },
    black: {
      name: "Black Tea",
      growTime: 17e3,
      brewTime: 7e3,
      pointValue: 8,
      cost: 120
    },
    oolong: {
      name: "Oolong Tea",
      growTime: 17e3,
      brewTime: 5e3,
      pointValue: 10,
      cost: 250
    },
    jasmine: {
      name: "Jasmine Tea",
      growTime: 8e3,
      brewTime: 4e3,
      pointValue: 4,
      cost: 500
    },
    sakura: {
      name: "Sakura Tea",
      growTime: 2e4,
      brewTime: 7e3,
      pointValue: 15,
      cost: 750
    },
    herbal: {
      name: "Herbal Tea",
      growTime: 1e4,
      brewTime: 12e3,
      pointValue: 14,
      cost: 900
    },
    matcha: {
      name: "Matcha Tea",
      growTime: 25e3,
      brewTime: 3e3,
      pointValue: 18,
      cost: 1200
    },
    mystical: {
      name: "Mystical Tea",
      growTime: 3e4,
      brewTime: 15e3,
      pointValue: 50,
      cost: 3e3
    }
    // celestial: {
    //   name: "Celestial Tea",
    //   growTime: 10000,
    //   brewTime: 5000,
    //   pointValue: 10,
    //   cost: 2000,
    // },
  };

  // src/svelte/stores.js
  var timeOfDay = writable("sunrise");
  var isDaytime = writable(true);
  var automationPausedStore = writable(false);

  // src/svelte/components/GardenPlot.svelte
  mark_module_start();
  GardenPlot[FILENAME] = "src/svelte/components/GardenPlot.svelte";
  var root_5 = add_locations(template(`<progress max="100"></progress>`), GardenPlot[FILENAME], [[164, 12]]);
  var root_8 = add_locations(template(`<progress max="100"></progress>`), GardenPlot[FILENAME], [[177, 12]]);
  var root_10 = add_locations(template(`<option> </option>`), GardenPlot[FILENAME], [[186, 16]]);
  var root = add_locations(template(`<div><div class="garden-box"><button><!></button> <!></div> <div class="harvest-box"><button><!></button> <!></div> <select></select> <div class="control-buttons"><button class="pause-button"> </button> <button class="delete-button" title="Delete garden plot">\u2715</button></div></div>`), GardenPlot[FILENAME], [
    [
      147,
      0,
      [
        [148, 4, [[149, 8]]],
        [168, 4, [[169, 8]]],
        [180, 4],
        [191, 4, [[193, 8], [202, 8]]]
      ]
    ]
  ]);
  function GardenPlot($$anchor, $$props) {
    check_target(new.target);
    push($$props, false, GardenPlot);
    const dispatch = createEventDispatcher();
    let progress = mutable_source(0);
    let harvestProgress = mutable_source(0);
    let isGrowing = prop($$props, "isGrowing", 12, false);
    let readyToHarvest = prop($$props, "readyToHarvest", 12, false);
    let isHarvesting = prop($$props, "isHarvesting", 12, false);
    let harvestInterval;
    let unlockedTeaTypes = prop($$props, "unlockedTeaTypes", 24, () => ({ green: true }));
    let selectedTeaType = prop($$props, "selectedTeaType", 12, "green");
    let isPaused = prop($$props, "isPaused", 12, false);
    let plotId = prop($$props, "plotId", 8);
    let isDay;
    isDaytime.subscribe((value) => isDay = value);
    function getState() {
      return {
        isGrowing: isGrowing(),
        readyToHarvest: readyToHarvest(),
        isHarvesting: isHarvesting(),
        progress: get(progress),
        harvestProgress: get(harvestProgress),
        selectedTeaType: selectedTeaType(),
        isPaused: isPaused()
      };
    }
    function setState(state2) {
      isGrowing(state2.isGrowing);
      readyToHarvest(state2.readyToHarvest);
      isHarvesting(state2.isHarvesting);
      set(progress, state2.progress);
      set(harvestProgress, state2.harvestProgress);
      selectedTeaType(state2.selectedTeaType || "green");
      isPaused(state2.isPaused || false);
      if (isGrowing()) {
        if (growthInterval) clearInterval(growthInterval);
        growthInterval = setInterval(
          () => {
            const increment2 = calculateGrowthIncrement(isDay);
            set(progress, get(progress) + increment2);
            if (get(progress) >= 100) {
              clearInterval(growthInterval);
              growthInterval = null;
              isGrowing(false);
              readyToHarvest(true);
              set(progress, 100);
              dispatch("plantReady", { teaType: selectedTeaType() });
            }
          },
          100
        );
      } else if (isHarvesting()) {
        startHarvesting();
      }
    }
    let growthInterval;
    function calculateGrowthIncrement(isDay2) {
      const baseTime = TEA[selectedTeaType()].growTime;
      const baseIncrement = 100 * 100 / baseTime;
      return isDay2 ? baseIncrement : baseIncrement * 0.5;
    }
    function calculateHarvestIncrement() {
      return 100 * 100 / TIMINGS.HARVEST_TIME;
    }
    function plantTea() {
      if (isGrowing() || readyToHarvest()) return;
      isGrowing(true);
      readyToHarvest(false);
      set(progress, 0);
      if (growthInterval) clearInterval(growthInterval);
      growthInterval = setInterval(
        () => {
          const increment2 = calculateGrowthIncrement(isDay);
          set(progress, get(progress) + increment2);
          if (get(progress) >= 100) {
            clearInterval(growthInterval);
            growthInterval = null;
            isGrowing(false);
            readyToHarvest(true);
            set(progress, 100);
            dispatch("plantReady", { teaType: selectedTeaType() });
          }
        },
        100
      );
    }
    function startHarvesting() {
      if (harvestInterval) clearInterval(harvestInterval);
      harvestInterval = setInterval(
        () => {
          set(harvestProgress, get(harvestProgress) + calculateHarvestIncrement());
          if (get(harvestProgress) >= 100) {
            clearInterval(harvestInterval);
            harvestInterval = null;
            isHarvesting(false);
            set(harvestProgress, 0);
            set(progress, 0);
            dispatch("plantComplete", { teaType: selectedTeaType() });
          }
        },
        100
      );
    }
    function harvest() {
      if (!readyToHarvest() || isHarvesting()) return;
      isHarvesting(true);
      set(harvestProgress, 0);
      readyToHarvest(false);
      dispatch("harvestStart", { teaType: selectedTeaType() });
      startHarvesting();
    }
    function togglePause() {
      isPaused(!isPaused());
      dispatch("pauseStateChanged", { isPaused: isPaused(), plotId: null });
    }
    function deletePlot() {
      if (confirm("Are you sure you want to delete this garden plot?")) {
        if (growthInterval) clearInterval(growthInterval);
        if (harvestInterval) clearInterval(harvestInterval);
        dispatch("deletePlot", { plotId: plotId() });
      }
    }
    onDestroy(() => {
      if (growthInterval) clearInterval(growthInterval);
      if (harvestInterval) clearInterval(harvestInterval);
    });
    init();
    var div = root();
    let classes;
    var div_1 = child(div);
    var button = child(div_1);
    var node = child(button);
    {
      var consequent = ($$anchor2) => {
        var text2 = text();
        template_effect(($0) => set_text(text2, `Growing Tea... (${$0 ?? ""}%)`), [() => Math.floor(get(progress))], derived_safe_equal);
        append($$anchor2, text2);
      };
      var alternate = ($$anchor2, $$elseif) => {
        {
          var consequent_1 = ($$anchor3) => {
            var text_1 = text("Ready to Harvest!");
            append($$anchor3, text_1);
          };
          var alternate_1 = ($$anchor3) => {
            var text_2 = text();
            template_effect(() => set_text(text_2, `Plant ${TEA[selectedTeaType()].name ?? ""}`));
            append($$anchor3, text_2);
          };
          if_block(
            $$anchor2,
            ($$render) => {
              if (readyToHarvest()) $$render(consequent_1);
              else $$render(alternate_1, false);
            },
            $$elseif
          );
        }
      };
      if_block(node, ($$render) => {
        if (isGrowing()) $$render(consequent);
        else $$render(alternate, false);
      });
    }
    reset(button);
    var node_1 = sibling(button, 2);
    {
      var consequent_2 = ($$anchor2) => {
        var progress_1 = root_5();
        template_effect(() => set_value(progress_1, get(progress)));
        append($$anchor2, progress_1);
      };
      if_block(node_1, ($$render) => {
        if (isGrowing() || readyToHarvest()) $$render(consequent_2);
      });
    }
    reset(div_1);
    var div_2 = sibling(div_1, 2);
    var button_1 = child(div_2);
    var node_2 = child(button_1);
    {
      var consequent_3 = ($$anchor2) => {
        var text_3 = text();
        template_effect(
          ($0) => set_text(text_3, `Harvesting... (${$0 ?? ""}%)`),
          [
            () => Math.floor(get(harvestProgress))
          ],
          derived_safe_equal
        );
        append($$anchor2, text_3);
      };
      var alternate_2 = ($$anchor2) => {
        var text_4 = text("Harvest Tea");
        append($$anchor2, text_4);
      };
      if_block(node_2, ($$render) => {
        if (isHarvesting()) $$render(consequent_3);
        else $$render(alternate_2, false);
      });
    }
    reset(button_1);
    var node_3 = sibling(button_1, 2);
    {
      var consequent_4 = ($$anchor2) => {
        var progress_2 = root_8();
        template_effect(() => set_value(progress_2, get(harvestProgress)));
        append($$anchor2, progress_2);
      };
      if_block(node_3, ($$render) => {
        if (isHarvesting()) $$render(consequent_4);
      });
    }
    reset(div_2);
    var select = sibling(div_2, 2);
    template_effect(() => {
      selectedTeaType();
      invalidate_inner_signals(() => {
        isGrowing();
        readyToHarvest();
        isHarvesting();
        Object;
        TEA;
        unlockedTeaTypes();
      });
    });
    each(select, 5, () => Object.entries(TEA), index, ($$anchor2, $$item) => {
      let type = () => get($$item)[0];
      type();
      let config = () => get($$item)[1];
      config();
      var fragment_3 = comment();
      var node_4 = first_child(fragment_3);
      {
        var consequent_5 = ($$anchor3) => {
          var option = root_10();
          var option_value = {};
          var text_5 = child(option, true);
          reset(option);
          template_effect(() => {
            if (option_value !== (option_value = type())) {
              option.value = null == (option.__value = type()) ? "" : type();
            }
            set_text(text_5, config().name);
          });
          append($$anchor3, option);
        };
        if_block(node_4, ($$render) => {
          if (unlockedTeaTypes()[type()]) $$render(consequent_5);
        });
      }
      append($$anchor2, fragment_3);
    });
    reset(select);
    var div_3 = sibling(select, 2);
    var button_2 = child(div_3);
    var text_6 = child(button_2, true);
    reset(button_2);
    var button_3 = sibling(button_2, 2);
    reset(div_3);
    reset(div);
    template_effect(
      ($0) => {
        classes = set_class(div, 1, "garden-plot", null, classes, $0);
        button.disabled = isGrowing() || readyToHarvest() || isHarvesting();
        set_attribute(button, "data-growing", isGrowing());
        set_attribute(button, "data-harvestable", readyToHarvest());
        button_1.disabled = !readyToHarvest() || isHarvesting();
        select.disabled = isGrowing() || readyToHarvest() || isHarvesting();
        set_attribute(button_2, "title", isPaused() ? "Enable automation" : "Pause automation");
        set_text(text_6, isPaused() ? "\u23F5" : "\u23F8");
      },
      [() => ({ paused: isPaused() })],
      derived_safe_equal
    );
    event("click", button, plantTea);
    event("click", button_1, harvest);
    bind_select_value(select, selectedTeaType);
    event("click", button_2, togglePause);
    event("click", button_3, deletePlot);
    append($$anchor, div);
    bind_prop($$props, "getState", getState);
    bind_prop($$props, "setState", setState);
    bind_prop($$props, "plantTea", plantTea);
    bind_prop($$props, "harvest", harvest);
    return pop({
      get getState() {
        return getState;
      },
      get setState() {
        return setState;
      },
      get plantTea() {
        return plantTea;
      },
      get harvest() {
        return harvest;
      },
      ...legacy_api()
    });
  }
  mark_module_end(GardenPlot);

  // src/svelte/components/Teapot.svelte
  mark_module_start();
  Teapot[FILENAME] = "src/svelte/components/Teapot.svelte";
  var root_52 = add_locations(template(`<progress max="100"></progress>`), Teapot[FILENAME], [[123, 8]]);
  var root2 = add_locations(template(`<div><button><!></button> <!> <div class="control-buttons"><button class="pause-button"> </button> <button class="delete-button" title="Delete teapot">\u2715</button></div></div>`), Teapot[FILENAME], [
    [
      107,
      0,
      [
        [108, 4],
        [126, 4, [[128, 8], [137, 8]]]
      ]
    ]
  ]);
  function Teapot($$anchor, $$props) {
    check_target(new.target);
    push($$props, false, Teapot);
    const dispatch = createEventDispatcher();
    let harvestedTeas = prop($$props, "harvestedTeas", 24, () => ({}));
    let progress = mutable_source(0);
    let isBrewing = mutable_source(false);
    let currentTeaType = mutable_source(null);
    let brewingInterval;
    let isPaused = prop($$props, "isPaused", 12, false);
    let teapotId = prop($$props, "teapotId", 8);
    function hasTeaAvailable() {
      return Object.values(harvestedTeas()).some((amount) => amount > 0);
    }
    function startBrewing() {
      let selectedType = null;
      for (const [type, amount] of Object.entries(harvestedTeas())) {
        if (amount > 0) {
          selectedType = type;
          break;
        }
      }
      if (!selectedType) {
        console.log("No tea available");
        set(isBrewing, false);
        return;
      }
      dispatch("useTea", { teaType: selectedType });
      set(currentTeaType, selectedType);
      console.log(...log_if_contains_state("log", `Starting to brew ${TEA[get(currentTeaType)].name}`));
      if (brewingInterval) clearInterval(brewingInterval);
      brewingInterval = setInterval(
        () => {
          set(progress, get(progress) + 1);
          if (get(progress) >= 100) {
            clearInterval(brewingInterval);
            brewingInterval = null;
            dispatch("teaBrewed", { teaType: get(currentTeaType) });
            set(isBrewing, false);
            set(progress, 0);
            set(currentTeaType, null);
          }
        },
        TEA[selectedType].brewTime / 100
      );
    }
    function brewTea() {
      if (get(isBrewing) || !hasTeaAvailable()) {
        console.log(...log_if_contains_state("log", "Cannot brew:", get(isBrewing) ? "already brewing" : "no tea available"));
        return;
      }
      set(progress, 0);
      set(isBrewing, true);
      startBrewing();
    }
    function togglePause() {
      isPaused(!isPaused());
      dispatch("pauseStateChanged", { isPaused: isPaused(), teapotId: null });
    }
    function deleteTeapot() {
      if (confirm("Are you sure you want to delete this teapot?")) {
        if (brewingInterval) clearInterval(brewingInterval);
        dispatch("deleteTeapot", { teapotId: teapotId() });
      }
    }
    onDestroy(() => {
      if (brewingInterval) clearInterval(brewingInterval);
    });
    function getState() {
      return {
        isBrewing: get(isBrewing),
        progress: get(progress),
        currentTeaType: get(currentTeaType),
        isPaused: isPaused()
      };
    }
    function setState(state2) {
      set(isBrewing, state2.isBrewing);
      set(progress, state2.progress);
      set(currentTeaType, state2.currentTeaType);
      isPaused(state2.isPaused || false);
      if (get(isBrewing) && get(currentTeaType)) {
        startBrewing();
      }
    }
    init();
    var div = root2();
    let classes;
    var button = child(div);
    let classes_1;
    var node = child(button);
    {
      var consequent = ($$anchor2) => {
        var text2 = text();
        template_effect(($0) => set_text(text2, `${TEA[get(currentTeaType)].name ?? ""} (${$0 ?? ""}%)`), [() => Math.floor(get(progress))], derived_safe_equal);
        append($$anchor2, text2);
      };
      var alternate = ($$anchor2, $$elseif) => {
        {
          var consequent_1 = ($$anchor3) => {
            var text_1 = text("No Tea Available");
            append($$anchor3, text_1);
          };
          var alternate_1 = ($$anchor3) => {
            var text_2 = text("Brew Tea");
            append($$anchor3, text_2);
          };
          if_block(
            $$anchor2,
            ($$render) => {
              if (!hasTeaAvailable()) $$render(consequent_1);
              else $$render(alternate_1, false);
            },
            $$elseif
          );
        }
      };
      if_block(node, ($$render) => {
        if (get(isBrewing) && get(currentTeaType)) $$render(consequent);
        else $$render(alternate, false);
      });
    }
    reset(button);
    var node_1 = sibling(button, 2);
    {
      var consequent_2 = ($$anchor2) => {
        var progress_1 = root_52();
        template_effect(() => set_value(progress_1, get(progress)));
        append($$anchor2, progress_1);
      };
      if_block(node_1, ($$render) => {
        if (get(isBrewing)) $$render(consequent_2);
      });
    }
    var div_1 = sibling(node_1, 2);
    var button_1 = child(div_1);
    var text_3 = child(button_1, true);
    reset(button_1);
    var button_2 = sibling(button_1, 2);
    reset(div_1);
    reset(div);
    template_effect(
      ($0, $1, $2) => {
        classes = set_class(div, 1, "teapot", null, classes, $0);
        button.disabled = $1;
        classes_1 = set_class(button, 1, "", null, classes_1, $2);
        set_attribute(button_1, "title", isPaused() ? "Enable automation" : "Pause automation");
        set_text(text_3, isPaused() ? "\u23F5" : "\u23F8");
      },
      [
        () => ({
          brewing: get(isBrewing),
          paused: isPaused()
        }),
        () => get(isBrewing) || !hasTeaAvailable(),
        () => ({ brewing: get(isBrewing) })
      ],
      derived_safe_equal
    );
    event("click", button, brewTea);
    event("click", button_1, togglePause);
    event("click", button_2, deleteTeapot);
    append($$anchor, div);
    bind_prop($$props, "brewTea", brewTea);
    bind_prop($$props, "getState", getState);
    bind_prop($$props, "setState", setState);
    return pop({
      get brewTea() {
        return brewTea;
      },
      get getState() {
        return getState;
      },
      get setState() {
        return setState;
      },
      ...legacy_api()
    });
  }
  mark_module_end(Teapot);

  // src/svelte/components/Shop.svelte
  mark_module_start();
  Shop[FILENAME] = "src/svelte/components/Shop.svelte";
  var root_53 = add_locations(template(`<button class="secondary hire-sprite"> <!></button>`), Shop[FILENAME], [[180, 12]]);
  var root_102 = add_locations(template(`<button class="secondary unlock-tea"> </button>`), Shop[FILENAME], [[199, 20]]);
  var root3 = add_locations(template(`<div class="dropdown"><details><summary>click here to do stuff</summary> <h3 class="label">buy upgrades</h3> <button class="secondary">+1 Garden Plot <!></button> <button class="secondary">+1 Teapot <!></button> <h3 class="label">Hire Sprites</h3> <!> <h3 class="label">Unlock New Tea</h3> <!> <h3 class="label">Other stuff</h3> <button class="secondary"> </button> <button class="secondary recalibrate-time">Recalibrate Time</button> <button class="secondary reset-game">Reset game</button></details></div>`), Shop[FILENAME], [
    [
      146,
      0,
      [
        [
          147,
          4,
          [
            [148, 8],
            [149, 8],
            [151, 8],
            [165, 8],
            [178, 8],
            [195, 8],
            [210, 8],
            [211, 8],
            [214, 8],
            [217, 8]
          ]
        ]
      ]
    ]
  ]);
  function Shop($$anchor, $$props) {
    check_target(new.target);
    push($$props, false, Shop);
    const gardenPlotCount = mutable_source();
    const teapotCount = mutable_source();
    const gardenSpriteCount = mutable_source();
    const harvestSpriteCount = mutable_source();
    const brewmasterSpriteCount = mutable_source();
    const cafeSpriteCount = mutable_source();
    const GARDEN_PLOT_COST = mutable_source();
    const TEAPOT_COST = mutable_source();
    const SPRITE_COSTS = mutable_source();
    const dispatch = createEventDispatcher();
    let points = prop($$props, "points", 8, 0);
    let unlockedTeaTypes = prop($$props, "unlockedTeaTypes", 24, () => ({ green: true }));
    let gardenPlots = prop($$props, "gardenPlots", 8, 1);
    let teapots = prop($$props, "teapots", 8, 1);
    let sprites = prop($$props, "sprites", 24, () => ({
      garden: 0,
      harvest: 0,
      brewmaster: 0,
      cafe: 0
    }));
    let allAutomationsPaused = prop($$props, "allAutomationsPaused", 12, false);
    let pauseStatus = mutable_source();
    automationPausedStore.subscribe((value) => {
      set(pauseStatus, value);
    });
    let purchaseCount = prop($$props, "purchaseCount", 24, () => ({
      gardenPlot: 0,
      teapot: 0,
      garden: 0,
      harvest: 0,
      brewmaster: 0,
      cafe: 0
    }));
    function getCurrentPrice(basePrice, count) {
      console.log(...log_if_contains_state("log", `Calculating price with base=${basePrice}, count=${count}, multiplier=${PRICES.MULTIPLIER}`));
      return Math.floor(basePrice * Math.pow(PRICES.MULTIPLIER, count));
    }
    function buyGardenPlot() {
      if (points() >= get(GARDEN_PLOT_COST) && gardenPlots() < MAX_LIMITS.GARDEN_PLOTS) {
        dispatch("purchase", {
          item: "gardenPlot",
          cost: get(GARDEN_PLOT_COST)
        });
      }
    }
    function buyTeapot() {
      if (points() >= get(TEAPOT_COST) && teapots() < MAX_LIMITS.TEAPOTS) {
        dispatch("purchase", { item: "teapot", cost: get(TEAPOT_COST) });
      }
    }
    function hireSprite(type) {
      if (points() >= get(SPRITE_COSTS)[type] && sprites()[type] < MAX_LIMITS.SPRITES[type]) {
        dispatch("purchase", {
          item: "sprite",
          spriteType: type,
          cost: get(SPRITE_COSTS)[type]
        });
      }
    }
    function unlockTeaType(type) {
      if (points() >= TEA[type].cost) {
        dispatch("purchase", {
          item: "teaType",
          teaType: type,
          cost: TEA[type].cost
        });
      }
    }
    function resetGame() {
      if (confirm("Are you sure you want to start over? This will erase all your progress.")) {
        dispatch("reset");
      }
    }
    function recalibrateTime() {
      if (confirm("Recalibrating will start the current day over and restart all your automations. Are you sure?")) {
        dispatch("recalibrate");
      }
    }
    function toggleAllAutomations() {
      allAutomationsPaused(!allAutomationsPaused());
      dispatch("toggleAllAutomations");
    }
    onMount(() => {
      console.log(...log_if_contains_state("log", "Shop component mounted with automation state:", allAutomationsPaused()));
    });
    legacy_pre_effect(() => deep_read_state(purchaseCount()), () => {
      set(gardenPlotCount, purchaseCount().gardenPlot);
    });
    legacy_pre_effect(() => deep_read_state(purchaseCount()), () => {
      set(teapotCount, purchaseCount().teapot);
    });
    legacy_pre_effect(() => deep_read_state(purchaseCount()), () => {
      set(gardenSpriteCount, purchaseCount().garden);
    });
    legacy_pre_effect(() => deep_read_state(purchaseCount()), () => {
      set(harvestSpriteCount, purchaseCount().harvest);
    });
    legacy_pre_effect(() => deep_read_state(purchaseCount()), () => {
      set(brewmasterSpriteCount, purchaseCount().brewmaster);
    });
    legacy_pre_effect(() => deep_read_state(purchaseCount()), () => {
      set(cafeSpriteCount, purchaseCount().cafe);
    });
    legacy_pre_effect(() => (PRICES, get(gardenPlotCount)), () => {
      set(GARDEN_PLOT_COST, getCurrentPrice(PRICES.BASE.GARDEN_PLOT, get(gardenPlotCount)));
    });
    legacy_pre_effect(() => (PRICES, get(teapotCount)), () => {
      set(TEAPOT_COST, getCurrentPrice(PRICES.BASE.TEAPOT, get(teapotCount)));
    });
    legacy_pre_effect(
      () => (PRICES, get(gardenSpriteCount), get(harvestSpriteCount), get(brewmasterSpriteCount), get(cafeSpriteCount)),
      () => {
        set(SPRITE_COSTS, {
          garden: getCurrentPrice(PRICES.BASE.SPRITE.GARDEN, get(gardenSpriteCount)),
          harvest: getCurrentPrice(PRICES.BASE.SPRITE.HARVEST, get(harvestSpriteCount)),
          brewmaster: getCurrentPrice(PRICES.BASE.SPRITE.BREWMASTER, get(brewmasterSpriteCount)),
          cafe: getCurrentPrice(PRICES.BASE.SPRITE.CAFE, get(cafeSpriteCount))
        });
      }
    );
    legacy_pre_effect_reset();
    init();
    var div = root3();
    var details = child(div);
    var button = sibling(child(details), 4);
    var node = sibling(child(button));
    {
      var consequent = ($$anchor2) => {
        var text2 = text("(Max reached)");
        append($$anchor2, text2);
      };
      var alternate = ($$anchor2) => {
        var text_1 = text();
        template_effect(() => set_text(text_1, `(${get(GARDEN_PLOT_COST) ?? ""} points) (${gardenPlots() ?? ""}/${MAX_LIMITS.GARDEN_PLOTS ?? ""})`));
        append($$anchor2, text_1);
      };
      if_block(node, ($$render) => {
        if (gardenPlots() >= MAX_LIMITS.GARDEN_PLOTS) $$render(consequent);
        else $$render(alternate, false);
      });
    }
    reset(button);
    var button_1 = sibling(button, 2);
    var node_1 = sibling(child(button_1));
    {
      var consequent_1 = ($$anchor2) => {
        var text_2 = text("(Max reached)");
        append($$anchor2, text_2);
      };
      var alternate_1 = ($$anchor2) => {
        var text_3 = text();
        template_effect(() => set_text(text_3, `(${get(TEAPOT_COST) ?? ""} points) (${teapots() ?? ""}/${MAX_LIMITS.TEAPOTS ?? ""})`));
        append($$anchor2, text_3);
      };
      if_block(node_1, ($$render) => {
        if (teapots() >= MAX_LIMITS.TEAPOTS) $$render(consequent_1);
        else $$render(alternate_1, false);
      });
    }
    reset(button_1);
    var node_2 = sibling(button_1, 4);
    each(node_2, 1, () => Object.entries(get(SPRITE_COSTS)), index, ($$anchor2, $$item) => {
      let type = () => get($$item)[0];
      type();
      let cost = () => get($$item)[1];
      cost();
      var button_2 = root_53();
      var text_4 = child(button_2);
      var node_3 = sibling(text_4);
      {
        var consequent_2 = ($$anchor3) => {
          var text_5 = text("(Max reached)");
          append($$anchor3, text_5);
        };
        var alternate_2 = ($$anchor3) => {
          var text_6 = text();
          template_effect(() => set_text(text_6, `(${cost() ?? ""} points) (${sprites()[type()] ?? ""}/${MAX_LIMITS.SPRITES[type()] ?? ""})`));
          append($$anchor3, text_6);
        };
        if_block(node_3, ($$render) => {
          if (sprites()[type()] >= MAX_LIMITS.SPRITES[type()]) $$render(consequent_2);
          else $$render(alternate_2, false);
        });
      }
      reset(button_2);
      template_effect(() => {
        button_2.disabled = points() < cost() || sprites()[type()] >= MAX_LIMITS.SPRITES[type()];
        set_text(text_4, `${type() ?? ""} Sprite `);
      });
      event("click", button_2, () => hireSprite(type()));
      append($$anchor2, button_2);
    });
    var node_4 = sibling(node_2, 4);
    {
      var consequent_4 = ($$anchor2) => {
        var fragment_3 = comment();
        var node_5 = first_child(fragment_3);
        each(node_5, 1, () => Object.entries(TEA), index, ($$anchor3, $$item) => {
          let type = () => get($$item)[0];
          type();
          let config = () => get($$item)[1];
          config();
          var fragment_4 = comment();
          var node_6 = first_child(fragment_4);
          {
            var consequent_3 = ($$anchor4) => {
              var button_3 = root_102();
              var text_7 = child(button_3);
              reset(button_3);
              template_effect(() => {
                button_3.disabled = points() < config().cost;
                set_text(text_7, `${config().name ?? ""} (${config().cost ?? ""} points)`);
              });
              event("click", button_3, () => unlockTeaType(type()));
              append($$anchor4, button_3);
            };
            if_block(node_6, ($$render) => {
              if (!unlockedTeaTypes()[type()]) $$render(consequent_3);
            });
          }
          append($$anchor3, fragment_4);
        });
        append($$anchor2, fragment_3);
      };
      if_block(node_4, ($$render) => {
        if (unlockedTeaTypes()) $$render(consequent_4);
      });
    }
    var button_4 = sibling(node_4, 4);
    var text_8 = child(button_4, true);
    reset(button_4);
    var button_5 = sibling(button_4, 2);
    var button_6 = sibling(button_5, 2);
    reset(details);
    reset(div);
    template_effect(() => {
      button.disabled = points() < get(GARDEN_PLOT_COST) || gardenPlots() >= MAX_LIMITS.GARDEN_PLOTS;
      button_1.disabled = points() < get(TEAPOT_COST) || teapots() >= MAX_LIMITS.TEAPOTS;
      set_text(text_8, get(pauseStatus) ? "Resume All Automations" : "Pause All Automations");
    });
    event("click", button, buyGardenPlot);
    event("click", button_1, buyTeapot);
    event("click", button_4, toggleAllAutomations);
    event("click", button_5, recalibrateTime);
    event("click", button_6, resetGame);
    append($$anchor, div);
    return pop({ ...legacy_api() });
  }
  mark_module_end(Shop);

  // src/svelte/components/AnimatedStat.svelte
  mark_module_start();
  AnimatedStat[FILENAME] = "src/svelte/components/AnimatedStat.svelte";
  var root4 = add_locations(template(`<p><!></p>`), AnimatedStat[FILENAME], [[38, 0]]);
  function AnimatedStat($$anchor, $$props) {
    check_target(new.target);
    push($$props, false, AnimatedStat);
    let value = prop($$props, "value", 8, 0);
    let label = prop($$props, "label", 8, "");
    let displayValue = mutable_source(value());
    let valueToAdd = mutable_source(0);
    let countInterval = mutable_source();
    function updateValue() {
      if (get(valueToAdd) > 0) {
        let increment2 = Math.max(1, Math.floor(get(valueToAdd) / 10));
        set(displayValue, get(displayValue) + increment2);
        set(valueToAdd, get(valueToAdd) - increment2);
      } else if (get(valueToAdd) < 0) {
        let decrement = Math.min(-1, Math.floor(get(valueToAdd) / 10));
        set(displayValue, get(displayValue) + decrement);
        set(valueToAdd, get(valueToAdd) - decrement);
      } else {
        clearInterval(get(countInterval));
        set(countInterval, null);
      }
    }
    onDestroy(() => {
      if (get(countInterval)) clearInterval(get(countInterval));
    });
    legacy_pre_effect(
      () => (deep_read_state(value()), get(displayValue), get(valueToAdd), get(countInterval)),
      () => {
        if (strict_equals(value(), get(displayValue) + get(valueToAdd), false)) {
          const difference = value() - (get(displayValue) + get(valueToAdd));
          set(valueToAdd, get(valueToAdd) + difference);
          if (!get(countInterval)) {
            set(countInterval, setInterval(updateValue, 50));
          }
        }
      }
    );
    legacy_pre_effect_reset();
    init();
    var p = root4();
    let classes;
    var node = child(p);
    {
      var consequent = ($$anchor2) => {
        var text2 = text();
        template_effect(() => set_text(text2, `${label() ?? ""}: ${get(displayValue) ?? ""}`));
        append($$anchor2, text2);
      };
      var alternate = ($$anchor2) => {
        var text_1 = text();
        template_effect(() => set_text(text_1, get(displayValue)));
        append($$anchor2, text_1);
      };
      if_block(node, ($$render) => {
        if (label()) $$render(consequent);
        else $$render(alternate, false);
      });
    }
    reset(p);
    template_effect(
      ($0) => classes = set_class(p, 1, "label stat-display", null, classes, $0),
      [
        () => ({
          animating: strict_equals(get(valueToAdd), 0, false)
        })
      ],
      derived_safe_equal
    );
    append($$anchor, p);
    return pop({ ...legacy_api() });
  }
  mark_module_end(AnimatedStat);

  // src/svelte/components/Teashop.svelte
  mark_module_start();
  Teashop[FILENAME] = "src/svelte/components/Teashop.svelte";
  var root_1 = add_locations(template(`<p class="label save-indicator"> </p>`), Teashop[FILENAME], [[1352, 16]]);
  var root_3 = add_locations(template(`<tr><td class="stats-tea-type"> </td><td><!></td><td><!></td><td><!></td></tr>`), Teashop[FILENAME], [
    [
      1395,
      36,
      [
        [1396, 40],
        [1399, 40],
        [1406, 40],
        [1413, 40]
      ]
    ]
  ]);
  var root_54 = add_locations(template(`<tr><td class="stats-tea-type"> </td><td><!></td><td><!></td><td><!></td><td><!></td></tr>`), Teashop[FILENAME], [
    [
      1442,
      36,
      [
        [1443, 40],
        [1446, 40],
        [1453, 40],
        [1460, 40],
        [1467, 40]
      ]
    ]
  ]);
  var root_12 = add_locations(template(`<div> </div>`), Teashop[FILENAME], [[1546, 8]]);
  var root5 = add_locations(template(`<div class="teashop"><div><p class="label"> </p></div> <div class="game-data"><div><!> <!> <!> <!></div> <div><!> <!> <!> <!></div> <div><!> <!> <!> <button class="secondary save-game">Save Game</button></div></div> <!> <div class="dropdown"><details><summary>Detailed stats</summary> <div class="stats-tables"><div class="stats-section"><h3>Current</h3> <table class="stats-table"><thead><tr><th class="stats-tea-type">Tea Type</th><th>Can Harvest</th><th>Can Brew</th><th>Can Serve</th></tr></thead><tbody></tbody></table></div> <div class="stats-section"><h3>Lifetime</h3> <table class="stats-table"><thead><tr><th class="stats-tea-type">Tea Type</th><th>Grown</th><th>Harvested</th><th>Brewed</th><th>Served</th></tr></thead><tbody></tbody></table></div></div></details></div> <div class="teashop-garden"><h2>Garden</h2> <div class="teashop-grid"></div></div> <div class="teashop-teapots"><h2>Teapots</h2> <div class="tea-inventory"><p class="label"><!></p></div> <div class="teashop-grid"></div></div> <div class="teashop-serve"><p class="label"><!></p> <button class="secondary"><!></button></div></div> <div class="toast-container"></div>`, 1), Teashop[FILENAME], [
    [
      1315,
      0,
      [
        [1316, 4, [[1323, 8]]],
        [
          1325,
          4,
          [
            [1326, 8],
            [1338, 8],
            [1347, 8, [[1358, 12]]]
          ]
        ],
        [
          1377,
          4,
          [
            [
              1378,
              8,
              [
                [1379, 12],
                [
                  1380,
                  12,
                  [
                    [
                      1381,
                      16,
                      [
                        [1382, 20],
                        [
                          1383,
                          20,
                          [
                            [
                              1384,
                              24,
                              [
                                [
                                  1385,
                                  28,
                                  [
                                    [1386, 32],
                                    [1387, 32],
                                    [1388, 32],
                                    [1389, 32]
                                  ]
                                ]
                              ]
                            ],
                            [1392, 24]
                          ]
                        ]
                      ]
                    ],
                    [
                      1427,
                      16,
                      [
                        [1428, 20],
                        [
                          1429,
                          20,
                          [
                            [
                              1430,
                              24,
                              [
                                [
                                  1431,
                                  28,
                                  [
                                    [1432, 32],
                                    [1433, 32],
                                    [1434, 32],
                                    [1435, 32],
                                    [1436, 32]
                                  ]
                                ]
                              ]
                            ],
                            [1439, 24]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        [1484, 4, [[1485, 8], [1486, 8]]],
        [
          1502,
          4,
          [
            [1503, 8],
            [1504, 8, [[1505, 12]]],
            [1512, 8]
          ]
        ],
        [1528, 4, [[1529, 8], [1532, 8]]]
      ]
    ],
    [1544, 0]
  ]);
  function Teashop($$anchor, $$props) {
    check_target(new.target);
    push($$props, false, Teashop);
    const [$$stores, $$cleanup] = setup_stores();
    const $isDaytime = () => (validate_store(isDaytime, "isDaytime"), store_get(isDaytime, "$isDaytime", $$stores));
    const dispatch = createEventDispatcher();
    let lastSavedTime = mutable_source(null);
    let lastActiveTime = Date.now();
    let grownPlants = 0;
    let readyToHarvest = 0;
    let harvestedTeas = mutable_source({ green: 0 });
    let brewedTea = mutable_source(0);
    let brewedTeas = mutable_source({ green: 0 });
    let nextServed = null;
    let servedTea = 0;
    let points = mutable_source(0);
    let gardenPlots = mutable_source(1);
    let teapots = mutable_source(1);
    let currentTime = mutable_source("sunrise");
    let cycleInterval;
    let automationIntervals = [];
    let allAutomationsPaused = mutable_source(false);
    let unlockedTeaTypes = mutable_source({ green: true });
    let purchaseCount = mutable_source({
      gardenPlot: 0,
      teapot: 0,
      garden: 0,
      harvest: 0,
      brewmaster: 0,
      cafe: 0
    });
    let teaStats = mutable_source({
      current: {
        ready: { total: 0, byType: {} },
        harvested: { total: 0, byType: {} },
        brewed: { total: 0, byType: {} }
      },
      lifetime: {
        grown: { total: 0, byType: {} },
        harvested: { total: 0, byType: {} },
        brewed: { total: 0, byType: {} },
        served: { total: 0, byType: {} }
      }
    });
    const QUARTERS = ["sunrise", "day", "sunset", "night"];
    let toasts = mutable_source([]);
    let toastId = 0;
    let sprites = mutable_source({
      garden: 0,
      harvest: 0,
      brewmaster: 0,
      cafe: 0
    });
    let workingSprites = {
      garden: 0,
      harvest: 0,
      brewmaster: 0,
      cafe: 0
    };
    let plotRefs = mutable_source([]);
    let teapotRefs = mutable_source([]);
    function createToast(message = "hiya!", points2 = null, type = "default") {
      const id = toastId++;
      const x = Math.random() * 40 - 20;
      const toast = {
        id,
        x,
        y: 0,
        opacity: 1,
        points: points2,
        message,
        type
      };
      set(toasts, [...get(toasts), toast]);
      setTimeout(
        () => {
          set(toasts, get(toasts).filter((t) => strict_equals(t.id, id, false)));
        },
        2e3
      );
    }
    function startDayCycle() {
      const savedState = localStorage.getItem("teashopGameState");
      if (savedState) {
        const gameState = JSON.parse(savedState);
        set(currentTime, gameState.currentTime || "sunrise");
      }
      timeOfDay.set(get(currentTime));
      isDaytime.set(strict_equals(get(currentTime), "night", false));
      if (cycleInterval) clearInterval(cycleInterval);
      cycleInterval = setInterval(
        () => {
          const currentIndex = QUARTERS.indexOf(get(currentTime));
          const nextIndex = (currentIndex + 1) % QUARTERS.length;
          set(currentTime, QUARTERS[nextIndex]);
          timeOfDay.set(get(currentTime));
          isDaytime.set(strict_equals(get(currentTime), "night", false));
          if (strict_equals(get(currentTime), "sunrise")) {
            createToast("The sun is rising!", null, "sunrise");
          } else if (strict_equals(get(currentTime), "sunset")) {
            createToast("The sun is setting!", null, "sunset");
          } else if (strict_equals(get(currentTime), "night")) {
            createToast("Shh...sprites are sleeping...", null, "night");
          }
          saveGameState();
        },
        TIMINGS.QUARTER_DURATION
      );
    }
    function handlePurchase(event2) {
      const { item, cost, spriteType, teaType } = event2.detail;
      console.log(...log_if_contains_state("log", "Received purchase event:", event2.detail));
      console.log(...log_if_contains_state("log", "Cost received:", cost));
      if (strict_equals(item, "gardenPlot")) {
        set(gardenPlots, get(gardenPlots) + 1);
        set(points, get(points) - cost);
        mutate(purchaseCount, get(purchaseCount).gardenPlot += 1);
      } else if (strict_equals(item, "teapot")) {
        set(teapots, get(teapots) + 1);
        set(points, get(points) - cost);
        mutate(purchaseCount, get(purchaseCount).teapot += 1);
      } else if (strict_equals(item, "teaType")) {
        mutate(unlockedTeaTypes, get(unlockedTeaTypes)[teaType] = true);
        set(points, get(points) - cost);
      } else if (strict_equals(item, "sprite")) {
        mutate(sprites, get(sprites)[spriteType] += 1);
        set(points, get(points) - cost);
        mutate(purchaseCount, get(purchaseCount)[spriteType] += 1);
        startAutomation();
      }
      set(purchaseCount, { ...get(purchaseCount) });
    }
    function handlePlantReady(event2) {
      const { teaType } = event2.detail;
      readyToHarvest++;
      mutate(teaStats, get(teaStats).current.ready.byType[teaType] = Math.max((get(teaStats).current.ready.byType[teaType] || 0) + 1, 0));
      mutate(teaStats, get(teaStats).current.ready.total = Math.max(readyToHarvest, 0));
    }
    function handlePlantComplete(event2) {
      const { teaType } = event2.detail;
      mutate(harvestedTeas, get(harvestedTeas)[teaType] = (get(harvestedTeas)[teaType] || 0) + 2);
      mutate(teaStats, get(teaStats).current.harvested.byType[teaType] = get(harvestedTeas)[teaType]);
      mutate(teaStats, get(teaStats).current.harvested.total = Object.values(get(harvestedTeas)).reduce((sum, val) => sum + val, 0));
      mutate(teaStats, get(teaStats).lifetime.grown.byType[teaType] = (get(teaStats).lifetime.grown.byType[teaType] || 0) + 2);
      mutate(teaStats, get(teaStats).lifetime.grown.total += 2);
      mutate(teaStats, get(teaStats).lifetime.harvested.byType[teaType] = (get(teaStats).lifetime.harvested.byType[teaType] || 0) + 2);
      mutate(teaStats, get(teaStats).lifetime.harvested.total += 2);
    }
    function handleHarvestStart(event2) {
      const { teaType } = event2.detail;
      readyToHarvest = Math.max(readyToHarvest - 1, 0);
      console.log(...log_if_contains_state("log", `Harvest started: ${teaType}, total ready: ${readyToHarvest}`));
      mutate(teaStats, get(teaStats).current.ready.byType[teaType] = Math.max((get(teaStats).current.ready.byType[teaType] || 0) - 1, 0));
      mutate(teaStats, get(teaStats).current.ready.total = readyToHarvest);
    }
    function handleHarvestedTea(event2) {
      const { teaType } = event2.detail;
      if (get(harvestedTeas)[teaType] > 0) {
        mutate(harvestedTeas, get(harvestedTeas)[teaType]--);
        set(harvestedTeas, { ...get(harvestedTeas) });
        mutate(teaStats, get(teaStats).current.harvested.byType[teaType] = get(harvestedTeas)[teaType]);
        mutate(teaStats, get(teaStats).current.harvested.total = Object.values(get(harvestedTeas)).reduce((sum, val) => sum + val, 0));
      }
    }
    function handleBrewedTea(event2) {
      const { teaType } = event2.detail;
      mutate(brewedTeas, get(brewedTeas)[teaType] = (get(brewedTeas)[teaType] || 0) + 1);
      set(brewedTeas, { ...get(brewedTeas) });
      set(brewedTea, get(brewedTea) + 1);
      mutate(teaStats, get(teaStats).current.brewed.byType = { ...get(brewedTeas) });
      mutate(teaStats, get(teaStats).current.brewed.total = get(brewedTea));
      mutate(teaStats, get(teaStats).lifetime.brewed.byType[teaType] = (get(teaStats).lifetime.brewed.byType[teaType] || 0) + 1);
      mutate(teaStats, get(teaStats).lifetime.brewed.total += 1);
    }
    function serveTea() {
      for (const [type, amount] of Object.entries(get(brewedTeas))) {
        if (amount > 0) {
          const pointsEarned = TEA[type].pointValue + get(sprites).cafe * POINTS.CAFE_SPRITE_BONUS;
          mutate(brewedTeas, get(brewedTeas)[type]--);
          update(brewedTea, -1);
          servedTea++;
          set(points, get(points) + pointsEarned);
          mutate(teaStats, get(teaStats).current.brewed.byType[type] = get(brewedTeas)[type]);
          mutate(teaStats, get(teaStats).current.brewed.total = Object.values(get(brewedTeas)).reduce((sum, val) => sum + val, 0));
          mutate(teaStats, get(teaStats).lifetime.served.byType[type] = (get(teaStats).lifetime.served.byType[type] || 0) + 1);
          mutate(teaStats, get(teaStats).lifetime.served.total += 1);
          dispatch("teaServed");
          createToast(`+${pointsEarned} points!`, pointsEarned);
          console.log(...log_if_contains_state("log", `Tea served: ${type}, points: ${pointsEarned}`));
          return;
        }
      }
    }
    function handleGardenPlotPauseChanged(event2) {
      const { isPaused, plotId } = event2.detail;
      saveGameState();
    }
    function handleTeapotPauseChanged(event2) {
      const { isPaused, teapotId } = event2.detail;
      saveGameState();
    }
    function handleDeletePlot(event2) {
      const { plotId } = event2.detail;
      if (get(gardenPlots) <= 1) {
        createToast("You need at least one garden plot!", null, "error");
        return;
      }
      set(plotRefs, get(plotRefs).filter((_, i) => strict_equals(i, plotId, false)));
      set(gardenPlots, get(gardenPlots) - 1);
      set(plotRefs, [...Array(get(gardenPlots))].map((_, i) => get(plotRefs)[i] || null));
      createToast("Garden plot removed", null, "success");
      saveGameState();
    }
    function handleDeleteTeapot(event2) {
      const { teapotId } = event2.detail;
      if (get(teapots) <= 1) {
        createToast("You need at least one teapot!", null, "error");
        return;
      }
      set(teapotRefs, get(teapotRefs).filter((_, i) => strict_equals(i, teapotId, false)));
      set(teapots, get(teapots) - 1);
      set(teapotRefs, [...Array(get(teapots))].map((_, i) => get(teapotRefs)[i] || null));
      createToast("Teapot removed", null, "success");
      saveGameState();
    }
    function handleRecalibrate() {
      recalibrateTime();
    }
    function startAutomation() {
      automationIntervals.forEach((interval) => clearInterval(interval));
      automationIntervals = [];
      const workingSprites2 = {
        garden: 0,
        harvest: 0,
        brewmaster: 0,
        cafe: 0
      };
      if (get(sprites).garden > 0) {
        const interval = setInterval(
          () => {
            if ($isDaytime() && workingSprites2.garden < get(sprites).garden) {
              for (let i = 0; i < get(plotRefs).length; i++) {
                const plot = get(plotRefs)[i];
                if (plot) {
                  const state2 = plot.getState();
                  if (state2.isPaused && !state2.isGrowing) {
                    continue;
                  }
                  if (!state2.isGrowing && !state2.readyToHarvest && !state2.isHarvesting) {
                    workingSprites2.garden++;
                    const selectedTeaType = state2.selectedTeaType || "green";
                    plot.plantTea();
                    setTimeout(
                      () => {
                        workingSprites2.garden--;
                      },
                      TEA[selectedTeaType].growTime
                    );
                    break;
                  }
                }
              }
            }
          },
          500
        );
        automationIntervals.push(interval);
      }
      if (get(sprites).harvest > 0) {
        const interval = setInterval(
          () => {
            if ($isDaytime() && workingSprites2.harvest < get(sprites).harvest) {
              for (let i = 0; i < get(plotRefs).length; i++) {
                const plot = get(plotRefs)[i];
                if (plot) {
                  const state2 = plot.getState();
                  if (state2.isPaused) {
                    continue;
                  }
                  if (state2.readyToHarvest && !state2.isHarvesting) {
                    workingSprites2.harvest++;
                    plot.harvest();
                    setTimeout(
                      () => {
                        workingSprites2.harvest--;
                      },
                      TIMINGS.HARVEST_TIME
                    );
                    break;
                  }
                }
              }
            }
          },
          500
        );
        automationIntervals.push(interval);
      }
      if (get(sprites).brewmaster > 0) {
        const interval = setInterval(
          () => {
            let actuallyBrewing = 0;
            get(teapotRefs).forEach((teapot) => {
              if (teapot && teapot.getState().isBrewing) {
                actuallyBrewing++;
              }
            });
            workingSprites2.brewmaster = actuallyBrewing;
            if ($isDaytime() && workingSprites2.brewmaster < get(sprites).brewmaster && Object.values(get(harvestedTeas)).some((amount) => amount > 0)) {
              for (let i = 0; i < get(teapotRefs).length; i++) {
                const teapot = get(teapotRefs)[i];
                if (teapot) {
                  const state2 = teapot.getState();
                  if (state2.isPaused && !state2.isBrewing) {
                    continue;
                  }
                  if (!state2.isBrewing) {
                    workingSprites2.brewmaster++;
                    teapot.brewTea();
                    const teapotId = i;
                    const monitorBrewing = setInterval(
                      () => {
                        const currentTeapot = get(teapotRefs)[teapotId];
                        if (currentTeapot) {
                          const currentState = currentTeapot.getState();
                          if (!currentState.isBrewing) {
                            clearInterval(monitorBrewing);
                            workingSprites2.brewmaster--;
                            console.log(...log_if_contains_state("log", `Teapot ${teapotId} finished brewing, ${workingSprites2.brewmaster} brewmasters now working`));
                          }
                        } else {
                          clearInterval(monitorBrewing);
                          workingSprites2.brewmaster--;
                          console.log(...log_if_contains_state("log", `Teapot ${teapotId} no longer exists, cleaning up`));
                        }
                      },
                      500
                    );
                    break;
                  }
                }
              }
            }
          },
          500
        );
        automationIntervals.push(interval);
      }
      if (get(sprites).cafe > 0) {
        const interval = setInterval(
          () => {
            if ($isDaytime() && workingSprites2.cafe < get(sprites).cafe && get(brewedTea) > 0) {
              workingSprites2.cafe++;
              serveTea();
              setTimeout(
                () => {
                  workingSprites2.cafe--;
                },
                TIMINGS.SERVE_COOLDOWN
              );
            }
          },
          500
        );
        automationIntervals.push(interval);
      }
    }
    function toggleAllAutomations() {
      set(allAutomationsPaused, !get(allAutomationsPaused));
      automationPausedStore.set(get(allAutomationsPaused));
      get(plotRefs).forEach((plot) => {
        if (plot) {
          const state2 = plot.getState();
          if (strict_equals(state2.isPaused, get(allAutomationsPaused), false)) {
            plot.setState({
              ...state2,
              isPaused: get(allAutomationsPaused)
            });
          }
        }
      });
      get(teapotRefs).forEach((teapot) => {
        if (teapot) {
          const state2 = teapot.getState();
          if (strict_equals(state2.isPaused, get(allAutomationsPaused), false)) {
            teapot.setState({
              ...state2,
              isPaused: get(allAutomationsPaused)
            });
          }
        }
      });
      createToast(get(allAutomationsPaused) ? "All automations paused!" : "All automations resumed!", null, "info");
    }
    function saveGameState() {
      const gameState = {
        lastSaved: Date.now(),
        lastActiveTime,
        currentTime: get(currentTime),
        grownPlants,
        readyToHarvest,
        harvestedTeas: get(harvestedTeas),
        unlockedTeaTypes: get(unlockedTeaTypes),
        brewedTea: get(brewedTea),
        brewedTeas: get(brewedTeas),
        nextServed,
        servedTea,
        teaStats: get(teaStats),
        points: get(points),
        gardenPlots: get(gardenPlots),
        teapots: get(teapots),
        sprites: get(sprites),
        purchaseCount: get(purchaseCount),
        allAutomationsPaused: get(allAutomationsPaused),
        plotStates: get(plotRefs).map((plot) => plot ? plot.getState() : null),
        teapotStates: get(teapotRefs).map((teapot) => teapot ? teapot.getState() : null)
      };
      try {
        localStorage.setItem("teashopGameState", JSON.stringify(gameState));
        set(lastSavedTime, /* @__PURE__ */ new Date());
        localStorage.setItem("cycleStartTime", Date.now().toString());
        createToast("Game saved! \u{1F4BE}", null, "success");
        console.log("Game state saved");
      } catch (e) {
        console.error(...log_if_contains_state("error", "Failed to save game state:", e));
        createToast("Error saving!", null, "error");
      }
    }
    function loadGameState() {
      if (DEBUG.TESTING_MODE) {
        console.log("Testing mode enabled!");
        set(points, DEBUG.STARTING_POINTS);
        if (DEBUG.UNLOCK_ALL_TEA) {
          Object.keys(TEA).forEach((type) => {
            mutate(unlockedTeaTypes, get(unlockedTeaTypes)[type] = true);
          });
        }
        set(gardenPlots, 1 + DEBUG.EXTRA_PLOTS);
        set(teapots, 1 + DEBUG.EXTRA_TEAPOTS);
        createToast("Testing mode active! \u{1F9EA}", null, "success");
        return;
      }
      const savedState = localStorage.getItem("teashopGameState");
      if (savedState) {
        const gameState = JSON.parse(savedState);
        lastActiveTime = gameState.lastActiveTime;
        grownPlants = gameState.grownPlants;
        readyToHarvest = gameState.readyToHarvest || 0;
        set(harvestedTeas, gameState.harvestedTeas || { green: 0 });
        set(unlockedTeaTypes, gameState.unlockedTeaTypes || { green: true });
        set(brewedTea, gameState.brewedTea);
        set(brewedTeas, gameState.brewedTeas || { green: 0 });
        nextServed = gameState.nextServed || "green";
        servedTea = gameState.servedTea;
        set(points, gameState.points);
        set(gardenPlots, gameState.gardenPlots);
        set(teapots, gameState.teapots);
        set(sprites, gameState.sprites);
        set(currentTime, gameState.currentTime || "sunrise");
        timeOfDay.set(get(currentTime));
        isDaytime.set(strict_equals(get(currentTime), "night", false));
        set(allAutomationsPaused, gameState.allAutomationsPaused || false);
        automationPausedStore.set(get(allAutomationsPaused));
        set(purchaseCount, gameState.purchaseCount || {
          gardenPlot: 0,
          teapot: 0,
          garden: 0,
          harvest: 0,
          brewmaster: 0,
          cafe: 0
        });
        set(teaStats, gameState.teaStats || {
          current: {
            ready: { total: 0, byType: {} },
            harvested: { total: 0, byType: {} },
            brewed: { total: 0, byType: {} }
          },
          lifetime: {
            grown: { total: 0, byType: {} },
            harvested: { total: 0, byType: {} },
            brewed: { total: 0, byType: {} },
            served: { total: 0, byType: {} }
          }
        });
        workingSprites = {
          garden: 0,
          harvest: 0,
          brewmaster: 0,
          cafe: 0
        };
        setTimeout(
          () => {
            gameState.plotStates.forEach((state2, i) => {
              if (state2 && get(plotRefs)[i]) {
                get(plotRefs)[i].setState(state2);
              }
            });
            gameState.teapotStates.forEach((state2, i) => {
              if (state2 && get(teapotRefs)[i]) {
                get(teapotRefs)[i].setState(state2);
              }
            });
            get(teapotRefs).forEach((teapot) => {
              if (teapot && teapot.getState().isBrewing) {
                workingSprites.brewmaster++;
              }
            });
            get(plotRefs).forEach((plot) => {
              if (plot) {
                const state2 = plot.getState();
                if (state2.isGrowing) {
                  workingSprites.garden++;
                }
                if (state2.isHarvesting) {
                  workingSprites.harvest++;
                }
              }
            });
            automationIntervals.forEach((interval) => clearInterval(interval));
            automationIntervals = [];
            startAutomation();
          },
          100
        );
        console.log("Game loaded");
      }
    }
    function resetGame() {
      localStorage.removeItem("teashopGameState");
      readyToHarvest = 0;
      set(harvestedTeas, { green: 0 });
      set(brewedTeas, { green: 0 });
      set(unlockedTeaTypes, { green: true });
      set(brewedTea, 0);
      nextServed = null;
      servedTea = 0;
      set(points, 0);
      set(gardenPlots, 1);
      set(teapots, 1);
      set(sprites, {
        garden: 0,
        harvest: 0,
        brewmaster: 0,
        cafe: 0
      });
      workingSprites = {
        garden: 0,
        harvest: 0,
        brewmaster: 0,
        cafe: 0
      };
      set(teaStats, {
        current: {
          ready: { total: 0, byType: {} },
          harvested: { total: 0, byType: {} },
          brewed: { total: 0, byType: {} }
        },
        lifetime: {
          grown: { total: 0, byType: {} },
          harvested: { total: 0, byType: {} },
          brewed: { total: 0, byType: {} },
          served: { total: 0, byType: {} }
        }
      });
      set(purchaseCount, {
        gardenPlot: 0,
        teapot: 0,
        garden: 0,
        harvest: 0,
        brewmaster: 0,
        cafe: 0
      });
      get(plotRefs).forEach((plot) => {
        if (plot) {
          plot.setState({
            isGrowing: false,
            readyToHarvest: false,
            progress: 0
          });
        }
      });
      get(teapotRefs).forEach((teapot) => {
        if (teapot) {
          teapot.setState({
            isBrewing: false,
            progress: 0,
            currentTeaType: null
          });
        }
      });
      automationIntervals.forEach((interval) => clearInterval(interval));
      automationIntervals = [];
      startAutomation();
      set(currentTime, "sunrise");
      timeOfDay.set(get(currentTime));
      isDaytime.set(true);
      if (cycleInterval) clearInterval(cycleInterval);
      startDayCycle();
      createToast("A fresh start...", null, "info");
    }
    function recalibrateTime() {
      set(currentTime, "sunrise");
      timeOfDay.set(get(currentTime));
      isDaytime.set(true);
      if (cycleInterval) clearInterval(cycleInterval);
      automationIntervals.forEach((interval) => clearInterval(interval));
      automationIntervals = [];
      workingSprites = {
        garden: 0,
        harvest: 0,
        brewmaster: 0,
        cafe: 0
      };
      startDayCycle();
      startAutomation();
      createToast("Time recalibrated! \u23F1\uFE0F", null, "success");
    }
    function simulateTimeAdvancement(elapsedMs) {
      if (elapsedMs < 5e3) return;
      let summary = {
        grown: 0,
        harvested: 0,
        brewed: 0,
        served: 0,
        pointsEarned: 0,
        byTeaType: {}
      };
      const quarterDuration = TIMINGS.QUARTER_DURATION;
      const quartersPassed = Math.floor(elapsedMs / quarterDuration);
      if (quartersPassed > 0) {
        const currentIndex = QUARTERS.indexOf(get(currentTime));
        const newIndex = (currentIndex + quartersPassed) % QUARTERS.length;
        set(currentTime, QUARTERS[newIndex]);
        timeOfDay.set(get(currentTime));
        isDaytime.set(strict_equals(get(currentTime), "night", false));
      }
      if (!$isDaytime()) {
        createToast("The sprites were sleeping while you were away!");
        return;
      }
      const availableSprites = { ...get(sprites) };
      if (availableSprites.garden > 0) {
        const availablePlots = get(plotRefs).filter((plot) => {
          if (!plot) return false;
          const state2 = plot.getState();
          return !state2.isGrowing && !state2.readyToHarvest && !state2.isHarvesting;
        });
        const gardenCyclesPerSprite = Math.floor(elapsedMs / TIMINGS.GARDEN_COOLDOWN);
        const totalPlantingOperations = Math.min(availableSprites.garden * gardenCyclesPerSprite, availablePlots.length);
        for (let i = 0; i < totalPlantingOperations; i++) {
          if (i < availablePlots.length) {
            const plot = availablePlots[i];
            const state2 = plot.getState();
            const teaType = state2.selectedTeaType || "green";
            const growTime = TEA[teaType].growTime;
            const growCycles = Math.floor((elapsedMs - i * TIMINGS.GARDEN_COOLDOWN) / growTime);
            if (growCycles > 0) {
              plot.setState({
                ...state2,
                isGrowing: false,
                readyToHarvest: true,
                progress: 100
              });
              summary.grown++;
              summary.byTeaType[teaType] = summary.byTeaType[teaType] || {
                grown: 0,
                harvested: 0,
                brewed: 0,
                served: 0
              };
              summary.byTeaType[teaType].grown++;
              mutate(teaStats, get(teaStats).current.ready.byType[teaType] = (get(teaStats).current.ready.byType[teaType] || 0) + 1);
              mutate(teaStats, get(teaStats).current.ready.total++);
              readyToHarvest++;
            } else {
              const progress = Math.min(100, (elapsedMs - i * TIMINGS.GARDEN_COOLDOWN) / growTime * 100);
              plot.setState({
                ...state2,
                isGrowing: true,
                readyToHarvest: false,
                progress
              });
            }
          }
        }
      }
      if (availableSprites.harvest > 0) {
        const readyPlots = get(plotRefs).filter((plot) => {
          if (!plot) return false;
          const state2 = plot.getState();
          return state2.readyToHarvest && !state2.isHarvesting;
        });
        const harvestCyclesPerSprite = Math.floor(elapsedMs / TIMINGS.HARVEST_COOLDOWN);
        const totalHarvestOperations = Math.min(availableSprites.harvest * harvestCyclesPerSprite, readyPlots.length);
        for (let i = 0; i < totalHarvestOperations; i++) {
          if (i < readyPlots.length) {
            const plot = readyPlots[i];
            const state2 = plot.getState();
            const teaType = state2.selectedTeaType || "green";
            plot.setState({
              ...state2,
              isGrowing: false,
              readyToHarvest: false,
              isHarvesting: false,
              progress: 0,
              harvestProgress: 0
            });
            mutate(harvestedTeas, get(harvestedTeas)[teaType] = (get(harvestedTeas)[teaType] || 0) + 2);
            summary.harvested += 2;
            summary.byTeaType[teaType] = summary.byTeaType[teaType] || {
              grown: 0,
              harvested: 0,
              brewed: 0,
              served: 0
            };
            summary.byTeaType[teaType].harvested += 2;
            mutate(teaStats, get(teaStats).current.ready.byType[teaType] = Math.max((get(teaStats).current.ready.byType[teaType] || 0) - 1, 0));
            mutate(teaStats, get(teaStats).current.ready.total = Math.max(get(teaStats).current.ready.total - 1, 0));
            readyToHarvest = Math.max(readyToHarvest - 1, 0);
            mutate(teaStats, get(teaStats).current.harvested.byType[teaType] = get(harvestedTeas)[teaType]);
            mutate(teaStats, get(teaStats).current.harvested.total = Object.values(get(harvestedTeas)).reduce((sum, val) => sum + val, 0));
            mutate(teaStats, get(teaStats).lifetime.harvested.byType[teaType] = (get(teaStats).lifetime.harvested.byType[teaType] || 0) + 2);
            mutate(teaStats, get(teaStats).lifetime.harvested.total += 2);
          }
        }
      }
      if (availableSprites.brewmaster > 0) {
        const availableTeapots = get(teapotRefs).filter((teapot) => {
          if (!teapot) return false;
          return !teapot.getState().isBrewing;
        }).length;
        const totalHarvestedTea = Object.values(get(harvestedTeas)).reduce((sum, val) => sum + val, 0);
        const availableTeaTypes = Object.keys(get(harvestedTeas)).filter((type) => get(harvestedTeas)[type] > 0);
        const avgBrewTime = availableTeaTypes.length ? availableTeaTypes.reduce((sum, type) => sum + TEA[type].brewTime, 0) / availableTeaTypes.length : 7e3;
        const brewCyclesPerSprite = Math.floor(elapsedMs / avgBrewTime);
        const totalBrewOperations = Math.min(availableSprites.brewmaster * brewCyclesPerSprite, availableTeapots, totalHarvestedTea);
        let remainingOperations = totalBrewOperations;
        for (const teaType of availableTeaTypes) {
          const typeOperations = Math.min(remainingOperations, get(harvestedTeas)[teaType]);
          if (typeOperations > 0) {
            mutate(harvestedTeas, get(harvestedTeas)[teaType] -= typeOperations);
            mutate(brewedTeas, get(brewedTeas)[teaType] = (get(brewedTeas)[teaType] || 0) + typeOperations);
            set(brewedTea, get(brewedTea) + typeOperations);
            summary.brewed += typeOperations;
            summary.byTeaType[teaType] = summary.byTeaType[teaType] || {
              grown: 0,
              harvested: 0,
              brewed: 0,
              served: 0
            };
            summary.byTeaType[teaType].brewed += typeOperations;
            mutate(teaStats, get(teaStats).current.harvested.byType[teaType] = get(harvestedTeas)[teaType]);
            mutate(teaStats, get(teaStats).current.brewed.byType[teaType] = get(brewedTeas)[teaType]);
            mutate(teaStats, get(teaStats).current.brewed.total = get(brewedTea));
            mutate(teaStats, get(teaStats).lifetime.brewed.byType[teaType] = (get(teaStats).lifetime.brewed.byType[teaType] || 0) + typeOperations);
            mutate(teaStats, get(teaStats).lifetime.brewed.total += typeOperations);
            remainingOperations -= typeOperations;
            if (remainingOperations <= 0) break;
          }
        }
      }
      if (availableSprites.cafe > 0) {
        const serveCyclesPerSprite = Math.floor(elapsedMs / TIMINGS.SERVE_COOLDOWN);
        const totalBrewedTea = Object.values(get(brewedTeas)).reduce((sum, val) => sum + val, 0);
        const totalServeOperations = Math.min(availableSprites.cafe * serveCyclesPerSprite, totalBrewedTea);
        const availableBrewedTypes = Object.keys(get(brewedTeas)).filter((type) => get(brewedTeas)[type] > 0);
        let remainingOperations = totalServeOperations;
        for (const teaType of availableBrewedTypes) {
          const typeOperations = Math.min(remainingOperations, get(brewedTeas)[teaType]);
          if (typeOperations > 0) {
            const pointsPerServe = TEA[teaType].pointValue + get(sprites).cafe * POINTS.CAFE_SPRITE_BONUS;
            const typePoints = pointsPerServe * typeOperations;
            mutate(brewedTeas, get(brewedTeas)[teaType] -= typeOperations);
            set(brewedTea, get(brewedTea) - typeOperations);
            servedTea += typeOperations;
            set(points, get(points) + typePoints);
            summary.served += typeOperations;
            summary.pointsEarned += typePoints;
            summary.byTeaType[teaType] = summary.byTeaType[teaType] || {
              grown: 0,
              harvested: 0,
              brewed: 0,
              served: 0
            };
            summary.byTeaType[teaType].served += typeOperations;
            mutate(teaStats, get(teaStats).current.brewed.byType[teaType] = get(brewedTeas)[teaType]);
            mutate(teaStats, get(teaStats).current.brewed.total = get(brewedTea));
            mutate(teaStats, get(teaStats).lifetime.served.byType[teaType] = (get(teaStats).lifetime.served.byType[teaType] || 0) + typeOperations);
            mutate(teaStats, get(teaStats).lifetime.served.total += typeOperations);
            remainingOperations -= typeOperations;
            if (remainingOperations <= 0) break;
          }
        }
      }
      if (summary.grown > 0 || summary.harvested > 0 || summary.brewed > 0 || summary.served > 0) {
        createToast(`While you were away, sprites were busy!`, null, "info");
        if (summary.served > 0) {
          createToast(`Sprites served ${summary.served} cups and earned ${summary.pointsEarned} points!`);
        }
        if (summary.brewed > 0) {
          createToast(`Sprites brewed ${summary.brewed} cups of tea.`);
        }
        if (summary.harvested > 0) {
          createToast(`Sprites harvested ${summary.harvested} units of tea.`);
        }
        if (summary.grown > 0) {
          createToast(`Sprites planted and grew ${summary.grown} plots of tea.`);
        }
      }
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        lastActiveTime = Date.now();
        saveGameState();
      } else {
        console.log("Tab visible again, resetting automation");
        automationIntervals.forEach((interval) => clearInterval(interval));
        automationIntervals = [];
        const now = Date.now();
        const elapsedMs = now - lastActiveTime;
        simulateTimeAdvancement(elapsedMs);
        workingSprites = {
          garden: 0,
          harvest: 0,
          brewmaster: 0,
          cafe: 0
        };
        get(teapotRefs).forEach((teapot) => {
          if (teapot && teapot.getState().isBrewing) {
            workingSprites.brewmaster++;
          }
        });
        let actualBrewingCount = 0;
        get(teapotRefs).forEach((teapot) => {
          if (teapot && teapot.getState().isBrewing) {
            actualBrewingCount++;
          }
        });
        workingSprites.brewmaster = actualBrewingCount;
        console.log(...log_if_contains_state("log", `Reset brewmaster count to ${actualBrewingCount} based on actual brewing teapots`));
        get(plotRefs).forEach((plot) => {
          if (plot) {
            const state2 = plot.getState();
            if (state2.isGrowing) {
              workingSprites.garden++;
            }
            if (state2.isHarvesting) {
              workingSprites.harvest++;
            }
          }
        });
        startAutomation();
      }
    });
    onMount(() => {
      console.log("Component mounted");
      loadGameState();
      startDayCycle();
      startAutomation();
      const autosaveInterval = setInterval(saveGameState, 3e4);
      automationIntervals.push(autosaveInterval);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          saveGameState();
        }
      });
      window.addEventListener("beforeunload", () => {
        saveGameState();
      });
    });
    onDestroy(() => {
      automationIntervals.forEach((interval) => clearInterval(interval));
      if (cycleInterval) clearInterval(cycleInterval);
    });
    legacy_pre_effect(() => (get(plotRefs), get(gardenPlots)), () => {
      set(plotRefs, [...Array(get(gardenPlots))].map((_, i) => get(plotRefs)[i] || null));
      console.log(...log_if_contains_state("log", "Updated plotRefs:", get(plotRefs)));
    });
    legacy_pre_effect(() => (get(teapotRefs), get(teapots)), () => {
      set(teapotRefs, [...Array(get(teapots))].map((_, i) => get(teapotRefs)[i] || null));
      console.log(...log_if_contains_state("log", "Updated teapotRefs:", get(teapotRefs)));
    });
    legacy_pre_effect(() => get(teaStats), () => {
      set(teaStats, {
        current: {
          ready: {
            total: 0,
            byType: {},
            ...get(teaStats)?.current?.ready || {}
          },
          harvested: {
            total: 0,
            byType: {},
            ...get(teaStats)?.current?.harvested || {}
          },
          brewed: {
            total: 0,
            byType: {},
            ...get(teaStats)?.current?.brewed || {}
          }
        },
        lifetime: {
          grown: {
            total: 0,
            byType: {},
            ...get(teaStats)?.lifetime?.grown || {}
          },
          harvested: {
            total: 0,
            byType: {},
            ...get(teaStats)?.lifetime?.harvested || {}
          },
          brewed: {
            total: 0,
            byType: {},
            ...get(teaStats)?.lifetime?.brewed || {}
          },
          served: {
            total: 0,
            byType: {},
            ...get(teaStats)?.lifetime?.served || {}
          }
        }
      });
    });
    legacy_pre_effect(() => get(brewedTeas), () => {
      nextAvailable = { type: null, amount: 0 };
      for (const [type, amount] of Object.entries(get(brewedTeas))) {
        if (amount > 0) {
          nextAvailable = { type, amount };
          break;
        }
      }
    });
    legacy_pre_effect_reset();
    init();
    var fragment = root5();
    var div = first_child(fragment);
    var div_1 = child(div);
    let classes;
    var p = child(div_1);
    var text2 = child(p);
    reset(p);
    reset(div_1);
    var div_2 = sibling(div_1, 2);
    var div_3 = child(div_2);
    var node = child(div_3);
    AnimatedStat(node, {
      label: "Points",
      get value() {
        return get(points);
      }
    });
    var node_1 = sibling(node, 2);
    AnimatedStat(node_1, {
      label: "Ready to harvest",
      get value() {
        return get(teaStats).current.ready.total;
      }
    });
    var node_2 = sibling(node_1, 2);
    AnimatedStat(node_2, {
      label: "Ready to brew",
      get value() {
        return get(teaStats).current.harvested.total;
      }
    });
    var node_3 = sibling(node_2, 2);
    AnimatedStat(node_3, {
      label: "Ready to serve",
      get value() {
        return get(brewedTea);
      }
    });
    reset(div_3);
    var div_4 = sibling(div_3, 2);
    var node_4 = child(div_4);
    AnimatedStat(node_4, {
      label: "Garden Sprites",
      get value() {
        return get(sprites).garden;
      }
    });
    var node_5 = sibling(node_4, 2);
    AnimatedStat(node_5, {
      label: "Harvest Sprites",
      get value() {
        return get(sprites).harvest;
      }
    });
    var node_6 = sibling(node_5, 2);
    AnimatedStat(node_6, {
      label: "Brewmaster Sprites",
      get value() {
        return get(sprites).brewmaster;
      }
    });
    var node_7 = sibling(node_6, 2);
    AnimatedStat(node_7, {
      label: "Cafe Sprites",
      get value() {
        return get(sprites).cafe;
      }
    });
    reset(div_4);
    var div_5 = sibling(div_4, 2);
    var node_8 = child(div_5);
    AnimatedStat(node_8, {
      label: "Garden Plots",
      get value() {
        return get(gardenPlots);
      }
    });
    var node_9 = sibling(node_8, 2);
    AnimatedStat(node_9, {
      label: "Teapots",
      get value() {
        return get(teapots);
      }
    });
    var node_10 = sibling(node_9, 2);
    {
      var consequent = ($$anchor2) => {
        var p_1 = root_1();
        var text_1 = child(p_1);
        reset(p_1);
        template_effect(
          ($0) => set_text(text_1, `Saved at ${$0 ?? ""}`),
          [
            () => get(lastSavedTime).toLocaleTimeString([], { timeStyle: "short" })
          ],
          derived_safe_equal
        );
        append($$anchor2, p_1);
      };
      if_block(node_10, ($$render) => {
        if (get(lastSavedTime)) $$render(consequent);
      });
    }
    var button = sibling(node_10, 2);
    reset(div_5);
    reset(div_2);
    var node_11 = sibling(div_2, 2);
    Shop(node_11, {
      get points() {
        return get(points);
      },
      get unlockedTeaTypes() {
        return get(unlockedTeaTypes);
      },
      get purchaseCount() {
        return get(purchaseCount);
      },
      get gardenPlots() {
        return get(gardenPlots);
      },
      get teapots() {
        return get(teapots);
      },
      get sprites() {
        return get(sprites);
      },
      $$events: {
        purchase: handlePurchase,
        reset: resetGame,
        recalibrate: handleRecalibrate,
        toggleAllAutomations
      }
    });
    var div_6 = sibling(node_11, 2);
    var details = child(div_6);
    var div_7 = sibling(child(details), 2);
    var div_8 = child(div_7);
    var table = sibling(child(div_8), 2);
    var tbody = sibling(child(table));
    each(tbody, 5, () => Object.entries(TEA), index, ($$anchor2, $$item) => {
      let type = () => get($$item)[0];
      type();
      let config = () => get($$item)[1];
      config();
      var fragment_1 = comment();
      var node_12 = first_child(fragment_1);
      {
        var consequent_1 = ($$anchor3) => {
          var tr = root_3();
          var td = child(tr);
          var text_2 = child(td, true);
          reset(td);
          var td_1 = sibling(td);
          var node_13 = child(td_1);
          AnimatedStat(node_13, {
            class: "table-stat",
            get value() {
              return get(teaStats).current.ready.byType[type()];
            }
          });
          reset(td_1);
          var td_2 = sibling(td_1);
          var node_14 = child(td_2);
          AnimatedStat(node_14, {
            class: "table-stat",
            get value() {
              return get(teaStats).current.harvested.byType[type()];
            }
          });
          reset(td_2);
          var td_3 = sibling(td_2);
          var node_15 = child(td_3);
          AnimatedStat(node_15, {
            class: "table-stat",
            get value() {
              return get(teaStats).current.brewed.byType[type()];
            }
          });
          reset(td_3);
          reset(tr);
          template_effect(() => set_text(text_2, config().name));
          append($$anchor3, tr);
        };
        if_block(node_12, ($$render) => {
          if (get(unlockedTeaTypes)[type()]) $$render(consequent_1);
        });
      }
      append($$anchor2, fragment_1);
    });
    reset(tbody);
    reset(table);
    reset(div_8);
    var div_9 = sibling(div_8, 2);
    var table_1 = sibling(child(div_9), 2);
    var tbody_1 = sibling(child(table_1));
    each(tbody_1, 5, () => Object.entries(TEA), index, ($$anchor2, $$item) => {
      let type = () => get($$item)[0];
      type();
      let config = () => get($$item)[1];
      config();
      var fragment_2 = comment();
      var node_16 = first_child(fragment_2);
      {
        var consequent_2 = ($$anchor3) => {
          var tr_1 = root_54();
          var td_4 = child(tr_1);
          var text_3 = child(td_4, true);
          reset(td_4);
          var td_5 = sibling(td_4);
          var node_17 = child(td_5);
          AnimatedStat(node_17, {
            class: "table-stat",
            get value() {
              return get(teaStats).lifetime.grown.byType[type()];
            }
          });
          reset(td_5);
          var td_6 = sibling(td_5);
          var node_18 = child(td_6);
          AnimatedStat(node_18, {
            class: "table-stat",
            get value() {
              return get(teaStats).lifetime.harvested.byType[type()];
            }
          });
          reset(td_6);
          var td_7 = sibling(td_6);
          var node_19 = child(td_7);
          AnimatedStat(node_19, {
            class: "table-stat",
            get value() {
              return get(teaStats).lifetime.brewed.byType[type()];
            }
          });
          reset(td_7);
          var td_8 = sibling(td_7);
          var node_20 = child(td_8);
          AnimatedStat(node_20, {
            class: "table-stat",
            get value() {
              return get(teaStats).lifetime.served.byType[type()];
            }
          });
          reset(td_8);
          reset(tr_1);
          template_effect(() => set_text(text_3, config().name));
          append($$anchor3, tr_1);
        };
        if_block(node_16, ($$render) => {
          if (get(unlockedTeaTypes)[type()]) $$render(consequent_2);
        });
      }
      append($$anchor2, fragment_2);
    });
    reset(tbody_1);
    reset(table_1);
    reset(div_9);
    reset(div_7);
    reset(details);
    reset(div_6);
    var div_10 = sibling(div_6, 2);
    var div_11 = sibling(child(div_10), 2);
    validate_each_keys(
      () => [
        ...Array(get(gardenPlots)).keys()
      ],
      (i) => i
    );
    each(
      div_11,
      5,
      () => [
        ...Array(get(gardenPlots)).keys()
      ],
      (i) => i,
      ($$anchor2, i) => {
        bind_this(
          GardenPlot($$anchor2, {
            get unlockedTeaTypes() {
              return get(unlockedTeaTypes);
            },
            class: "garden-plot",
            $$events: {
              plantReady: handlePlantReady,
              harvestStart: handleHarvestStart,
              plantComplete: handlePlantComplete,
              pauseStateChanged: handleGardenPlotPauseChanged,
              deletePlot: handleDeletePlot
            },
            $$legacy: true
          }),
          ($$value, i2) => mutate(plotRefs, get(plotRefs)[i2] = $$value),
          (i2) => get(plotRefs)?.[i2],
          () => [get(i)]
        );
      }
    );
    reset(div_11);
    reset(div_10);
    var div_12 = sibling(div_10, 2);
    var div_13 = sibling(child(div_12), 2);
    var p_2 = child(div_13);
    var node_21 = child(p_2);
    AnimatedStat(node_21, {
      label: "Ready to brew",
      get value() {
        return get(teaStats).current.harvested.total;
      }
    });
    reset(p_2);
    reset(div_13);
    var div_14 = sibling(div_13, 2);
    validate_each_keys(() => [...Array(get(teapots)).keys()], (i) => i);
    each(div_14, 5, () => [...Array(get(teapots)).keys()], (i) => i, ($$anchor2, i) => {
      {
        add_owner_effect(() => get(allAutomationsPaused), Teapot);
        bind_this(
          Teapot($$anchor2, {
            get harvestedTeas() {
              return get(harvestedTeas);
            },
            class: "teapot",
            get allAutomationsPaused() {
              return get(allAutomationsPaused);
            },
            set allAutomationsPaused($$value) {
              set(allAutomationsPaused, $$value);
            },
            $$events: {
              useTea: handleHarvestedTea,
              teaBrewed: handleBrewedTea,
              pauseStateChanged: handleTeapotPauseChanged,
              deleteTeapot: handleDeleteTeapot
            },
            $$legacy: true
          }),
          ($$value, i2) => mutate(teapotRefs, get(teapotRefs)[i2] = $$value),
          (i2) => get(teapotRefs)?.[i2],
          () => [get(i)]
        );
      }
    });
    reset(div_14);
    reset(div_12);
    var div_15 = sibling(div_12, 2);
    var p_3 = child(div_15);
    var node_22 = child(p_3);
    AnimatedStat(node_22, {
      label: "Ready to serve",
      get value() {
        return get(brewedTea);
      }
    });
    reset(p_3);
    var button_1 = sibling(p_3, 2);
    var node_23 = child(button_1);
    {
      var consequent_3 = ($$anchor2) => {
        var text_4 = text("Serve Tea");
        append($$anchor2, text_4);
      };
      var alternate = ($$anchor2, $$elseif) => {
        {
          var consequent_4 = ($$anchor3) => {
            var text_5 = text("No Tea Available");
            append($$anchor3, text_5);
          };
          var alternate_1 = ($$anchor3) => {
            var text_6 = text("Serve Tea");
            append($$anchor3, text_6);
          };
          if_block(
            $$anchor2,
            ($$render) => {
              if (get(brewedTea) < 1) $$render(consequent_4);
              else $$render(alternate_1, false);
            },
            $$elseif
          );
        }
      };
      if_block(node_23, ($$render) => {
        if (get(brewedTea) >= 1) $$render(consequent_3);
        else $$render(alternate, false);
      });
    }
    reset(button_1);
    reset(div_15);
    reset(div);
    var div_16 = sibling(div, 2);
    validate_each_keys(() => get(toasts), (toast) => toast.id);
    each(div_16, 5, () => get(toasts), (toast) => toast.id, ($$anchor2, toast) => {
      var div_17 = root_12();
      var text_7 = child(div_17, true);
      reset(div_17);
      template_effect(() => {
        set_class(div_17, 1, `toast ${get(toast).type ?? ""}`);
        set_style(div_17, `
                            --x: ${get(toast).x ?? ""}px;
                            --opacity: ${get(toast).opacity ?? ""};
                        `);
        set_text(text_7, get(toast).message);
      });
      append($$anchor2, div_17);
    });
    reset(div_16);
    template_effect(
      ($0) => {
        classes = set_class(div_1, 1, "time-indicator", null, classes, $0);
        set_text(text2, `Current Time: ${get(currentTime) ?? ""}`);
        button_1.disabled = get(brewedTea) < 1;
      },
      [
        () => ({
          sunrise: strict_equals(get(currentTime), "sunrise"),
          day: strict_equals(get(currentTime), "day"),
          sunset: strict_equals(get(currentTime), "sunset"),
          night: strict_equals(get(currentTime), "night")
        })
      ],
      derived_safe_equal
    );
    event("click", button, saveGameState);
    event("click", button_1, serveTea);
    append($$anchor, fragment);
    var $$pop = pop({ ...legacy_api() });
    $$cleanup();
    return $$pop;
  }
  mark_module_end(Teashop);

  // src/svelte/main.js
  function initApp() {
    console.log("Initializing app...");
    const target = document.getElementById("teashop");
    console.log("Target element:", target);
    if (target) {
      try {
        const app = mount(Teashop, {
          target,
          props: {}
        });
        console.log("Teashop app mounted successfully");
      } catch (error) {
        console.error("Error mounting Teashop:", error);
      }
    } else {
      console.error("Could not find #teashop element");
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
//# sourceMappingURL=teashop.js.map
