import { deviceApi } from '/@/api/devices';
import _ from 'lodash-es';
import { compute, dict } from '@fast-crud/fast-crud';
import { TableDataRow } from '/@/views/iot/devices/model';

// eslint-disable-next-line no-unused-vars
export const createDeviceCrudOptions = function ({ expose }, customerId, deviceDetailRef?, addRulesRef?, selectedItems?) {
	let records: any[] = [];
	const FsButton = {
		link: true,
	};
	const customSwitchComponent = {
		activeColor: 'var(--el-color-primary)',
		inactiveColor: 'var(el-switch-of-color)',
	};

	const onSelectionChange = (changed) => {
		selectedItems.value = changed.map((item) => item);
	};
	const pageRequest = async (query) => {
		const params = reactive({
			offset: query.page.currentPage - 1,
			limit: query.page.pageSize,
			onlyActive: query.form.active ?? false,
			customerId,
			name: query.form.name ?? '',
		});

		const res = await deviceApi().devcieList(params);
		records = res.data.rows;
		return {
			records,
			currentPage: params.offset + 1,
			pageSize: params.limit,
			total: res.data.total,
		};
	};
	const editRequest = async ({ form, row }) => {
		const newItem = _.clone(form);
		newItem.id = row.id;
		const target = _.find(records, (item: TableDataRow) => {
			return row.id === item.id;
		});
		try {
			await deviceApi().putdevcie(newItem);
			_.merge(target, form);
			return target;
		} catch (e) {
			ElMessage.error(e.response.msg);
		}
	};
	const delRequest = async ({ row }) => {
		try {
			await deviceApi().deletedevcie(row.id);
			_.remove(records, (item: TableDataRow) => {
				return item.id === row.id;
			});
		} catch (e) {
			ElMessage.error(e.response.msg);
		}
	};

	const addRequest = async ({ form }) => {
		await deviceApi().postdevcie(form);
		records.push(form);
		return form;
	};
	return {
		crudOptions: {
			request: {
				pageRequest,
				addRequest,
				editRequest,
				delRequest,
			},

			// search: {
			// 	...FsButton,
			// 	show: true,
			// 	doSearch(query) {

			// 	},
			// },
			table: {
				border: false,
				onSelectionChange,
			},
			form: {
				labelWidth: '130px', //
			},
			rowHandle: {
				width: 180,
				dropdown: {
					more: {
						//??????????????????
						text: '??????',
						...FsButton,
						icon: 'operation',
					},
				},

				buttons: {
					view: {
						show: false,
					},
					edit: {
						icon: 'editPen',
						...FsButton,
						order: 1,
					}, //????????????
					remove: {
						icon: 'Delete',
						...FsButton,
						order: 5,
					}, //????????????
				},
			},
			columns: {
				$checked: {
					title: '??????',
					form: { show: false },
					column: {
						type: 'selection',
						align: 'center',
						width: '55px',
						columnSetDisabled: false, //???????????????????????????
						selectable(row, index) {
							return true;
						},
					},
				},
				name: {
					title: '????????????',
					type: 'button',
					search: { show: true },
					column: {
						component: {
							...FsButton,
							type: 'primary',
							on: {
								onClick({ row }) {
									deviceDetailRef.value.openDialog(row);
								},
							},
						},
					},
				},
				deviceType: {
					title: '????????????',
					type: 'dict-select',
					search: { show: false },
					dict: dict({
						data: [
							{ value: 'Gateway', label: '??????' },
							{ value: 'Device', label: '??????', color: 'warning' },
						],
					}),

					column: { width: '80px' },
				},

				active: {
					title: '????????????',
					type: 'dict-switch',
					search: { show: true },
					dict: dict({
						data: [
							{ value: true, label: '??????' },
							{ value: false, label: '??????', color: 'danger' },
						],
					}),
					column: { width: '80px' },
					viewForm: {
						show: true,
						component: customSwitchComponent,
					},
					addForm: {
						show: false,
						component: customSwitchComponent,
					},
					editForm: {
						show: false,
						component: customSwitchComponent,
					},
				},
				lastActivityDateTime: {
					title: '??????????????????',
					type: 'text',
					column: {
						show: false,
					},
					search: { show: false },
					addForm: {
						show: false,
					},
					editForm: {
						show: false,
					},
				},
				identityType: {
					title: '????????????',
					type: 'dict-select',
					search: { show: false },
					column: { width: '120px' },
					dict: dict({
						data: [
							{ value: 'AccessToken', label: 'AccessToken' },
							{ value: 'X509Certificate', label: 'X509Certificate' },
						],
					}),
				},
				identityId: {
					title: 'Token',
					type: 'text',
					search: { show: false },
					column: {
						show: false,
					},
					viewForm: {
						show: false,
					},
					addForm: {
						show: false,
					},
					editForm: {
						show: false,
					},
				},
				timeout: {
					column: {
						show: false,
					},
					title: '??????',
					type: 'text',
					search: { show: false },
				},
			},
		},
	};
};
