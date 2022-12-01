import { defineComponent, ref } from "vue";
import "./home.scss";
export default defineComponent({
  setup() {
    const count = ref(2);
    const formRef = ref();
    const value = ref();
    const options = [
      {
        label: "2222",
        value: 2222,
      },
      {
        label: "3333",
        value: 3333,
      },
      {
        label: "4444",
        value: 4444,
      },
    ];
    const formDataSource = [
      {
        title: "input",
        type: "input",
        name: "input",
      },
      {
        title: "select",
        type: "select",
        name: "select",
        options: [
          {
            label: "2222",
            value: 2222,
          },
          {
            label: "3333",
            value: 3333,
          },
          {
            label: "4444",
            value: 4444,
          },
        ],
        rules: [{ required: true, message: "请输入邮箱地址" }],
      },
      {
        title: "radio",
        type: "radio",
        name: "radio",
        options: [
          {
            label: "2222",
            value: 2222,
          },
          {
            label: "3333",
            value: 3333,
          },
          {
            label: "4444",
            value: 4444,
          },
        ],
      },
      {
        title: "checkbox",
        type: "checkbox",
        name: "checkbox",
        options: [
          {
            label: "qqqqq",
            value: 2222,
          },
          {
            label: "wwwww",
            value: 3333,
          },
          {
            label: "eeeee",
            value: 4444,
          },
          {
            label: "eeeee1",
            value: 44441,
          },
          {
            label: "eeeee2",
            value: 44442,
          },
          {
            label: "eeeee3",
            value: 4444232,
          },
          {
            label: "eeeee33",
            value: 444423,
          },
        ],
      },
      {
        title: "date",
        type: "date",
        name: "date",
      },
      {
        title: "dates",
        type: "dates",
        name: "dates",
      },
      {
        title: "rate",
        type: "rate",
        name: "rate",
      },
      {
        title: "color",
        type: "color",
        name: "color",
      },
      {
        title: "datetimerange",
        type: "datetimerange",
        name: "datetimerange",
      },
      {
        title: "datetime",
        type: "datetime",
        name: "datetime",
      },
      {
        title: "monthrange",
        type: "monthrange",
        name: "monthrange",
      },
      {
        title: "date-month",
        type: "date-month",
        name: "date-month",
      },
      {
        title: "number",
        type: "number",
        name: "number",
        fieldItemProps: {
          step: 2,
          "step-strictly": true,
        },
      },
      {
        title: "switch",
        type: "switch",
        name: "switch",
      },
      {
        title: "slider",
        type: "slider",
        name: "slider",
        fieldItemProps: {
          range: true,
        },
      },
      {
        title: "cascader",
        type: "cascader",
        name: "cascader",
        options: [
          {
            label: "qqqqq",
            value: 2222,
          },
          {
            label: "wwwww",
            value: 3333,
          },
          {
            label: "eeeee",
            value: 4444,
          },
        ],
      },
      {
        title: "transfer",
        type: "transfer",
        name: "transfer",
        options: [
          {
            label: "qqqqq",
            key: 2222,
          },
          {
            label: "wwwww",
            key: 3333,
          },
          {
            label: "eeeee",
            key: 4444,
          },
        ],
        formItemProps: {
          style: { "grid-column": "span 2" },
        },
      },
      {
        title: "textarea",
        type: "textarea",
        name: "textarea",
      },
      {
        title: "custom",
        type: "custom",
        name: "custom",
        initialValue: "2222",
        rules: [{ required: true, message: "请输入邮箱地址" }],
      },
      {
        title: "upload",
        type: "upload",
        name: "upload",
        fieldItemProps: {
          action: "",
        },
      },
    ];
    const onSubmit = async () => {
      console.log('表单提交', await formRef.value.validateFields());
    };
    const addCount = () => {
      count.value = count.value + 1;
    }
    const tableColumns = [
      {
        title: "姓名",
        dataIndex: "name",
        valueType: "select",
        valueOptions: [
          {
            label: "海洋",
            value: "海洋",
          },
          {
            label: "大陆",
            value: "大陆",
          },
        ],
      },
      {
        title: "民族",
        dataIndex: "ids",
        hideInTable: true, // 在表格中隐藏
        initialValue: '汉族',
      },
      {
        title: "年龄",
        dataIndex: "id",
        searchTitle: '出生日期',
        valueType: 'daterange',
      },
      {
        title: "性别",
        dataIndex: "jump",
      },
      {
        title: "描述",
        dataIndex: "description",
        hideInSearch: true, // 在搜索条件中隐藏
      },
    ];
    const fetchData = async (data: any) => {
      console.log('fetchData ->', data);
      if (data.current === 1) {
        return {
          success: true,
          data: Array(20)
            .fill({})
            .map((item, index) => ({
              ...item,
              name: index + "姓名",
              id: index,
            })),
          total: 37,
        };
      } else {
        return {
          success: true,
          data: Array(17)
            .fill({})
            .map((item, index) => ({
              ...item,
              name: index + "姓名",
              id: index + data.pageSize,
            })),
          total: 37,
        };
      }
    };
    return () => (
      <div class="container">
        <h1>Home</h1>
        <h2>2222</h2>
        <div>count: {count.value}</div>
        <el-button onClick={addCount} type="primary">addCount</el-button>
        <cn-tags
          value={value.value}
          onChange={(text: any) => (value.value = text)}
          options={options}
        ></cn-tags>
        <cn-pagination total={70} current={2}></cn-pagination>
        <div>
          <cn-badge></cn-badge>
        </div>
        <el-divider>cn-form 生成表单</el-divider>
        <div>
          <cn-form
            ref={formRef}
            columns={3}
            data={formDataSource}
            scopedSlots={{
              customCustomFormComponent: ({ onChange, value }: any) => {
                return <el-input value={value} onInput={onChange}></el-input>;
              },
              customFormExtra: () => {
                return "customFormExtra";
              },
            }}
          ></cn-form>
        </div>
        <el-button onClick={onSubmit} type="success">
          提交表单
        </el-button>
        <el-divider>cn-table 生成表格</el-divider>
        <cn-table
          request={fetchData}
          columns={tableColumns}
          showIndex
          scopedSlots={{
            headOperation: () => (
              <el-button size="small" type="warning">
                新增
              </el-button>
            ),
          }}
          searchType="grid"
          rowSelection={{
            onBatchDelete: (rows: any) => {
              console.log("onBatchDelete", rows);
            },
            onBatchDownload: (rows: any) => {
              console.log("onBatchDownload", rows);
            },
          }}
        ></cn-table>
      </div>
    );
  },
});
