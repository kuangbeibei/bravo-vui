<template>
	<div
		v-show="visible"
		class="bravo-loading-mask"
	>
		<div class="bravo-loading-spinner">
			<svg class="circular" viewBox="25 25 50 50">
				<circle class="path" cx="50" cy="50" r="20" fill="none" />
			</svg>
		</div>
	</div>
</template>
<script>
import "../style/loading.scss";
export default {
    data() {
        return {
            visible: false,
        }
    }
};
</script>