<template>
	<el-card>
		<div class="z-crud">
			<fs-crud ref="crudRef" v-bind="crudBinding" />
		</div>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@fast-crud/fast-crud';
import { useExpose } from '@fast-crud/fast-crud';
import { createCustomerListCrudOptions } from './crudOptions/customerListCrudOptions';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';
import { useRoute } from 'vue-router';
const stores = useUserInfo();
const route = useRoute();
const { userInfos } = storeToRefs(stores);
const crudRef = ref();
const crudBinding = ref();
const { crudExpose } = useExpose({ crudRef, crudBinding });
const tenantId = route.query.id || userInfos.value.tenant.id;
const { crudOptions } = createCustomerListCrudOptions({ expose: crudExpose }, tenantId);
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
useCrud({ crudExpose, crudOptions });
onMounted(() => {
	crudExpose.doRefresh();
});
</script>

<style scoped lang="scss">
.z-crud {
	height: calc(100vh - 160px);
}
</style>
