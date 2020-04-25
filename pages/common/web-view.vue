<template>
	<view class="">
		<web-view :webview-styles="webviewStyles" :src="path"></web-view>
	</view>
</template>

<script>
	export default {
		name: 'WebView',
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				path: ''
			}
		},
		onLoad() {
			this.path = this.$routeParams.path
		}
	}
</script>
