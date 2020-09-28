import Vue from "vue";
import Loading from "./loading.vue";

const Mask = Vue.extend(Loading);

const toggleLoading = function(el, binding) {
	if (binding.value) {
		el.instance.visible = true;
	} else {
		el.instance.visible = false;
	}
}

Vue.directive("loading", {
	bind: function (el, binding, vnode) {
		const vm = vnode.context;
		const mask = new Mask({
			el: document.createElement("div"),
			data() {}
		});
		el.instance = mask;
		el.mask = mask.$el;
		el.appendChild(el.mask);
		binding.value && toggleLoading(el, binding);
	},

	update: function (el, binding) {
		toggleLoading(el, binding)
	},

	unbind: function (el) {
		el.instance && el.instance.$destroy();
	},
});