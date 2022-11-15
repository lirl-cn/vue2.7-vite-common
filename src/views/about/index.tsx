
import { reactive, ref, onMounted, defineComponent } from 'vue';

interface Props{
  width: number;
}

export default defineComponent<Props>({
  props: ['width'],
  setup(props) {
    const formRef = ref()
    const formData = ref({})
    const dd = ref()
    const columns1 = [
      {
        title: 'date1',
        name: 'date1',
        type: 'date-range',
      },
      {
        title: 'date2',
        name: 'date2',
        type: 'date',
      },
      {
        title: 'text',
        name: 'text',
        type: 'input',
      },
    ]
    const columns = [
      {
        title: 'date',
        group: [
          {
            title: 'date1',
            name: 'date1',
            type: 'date-range',
          },
          {
            title: 'date2',
            name: 'date2',
            type: 'date',
          },
          {
            title: 'text',
            name: 'text',
            type: 'input',
          },
        ]
      },
    ]
    const data = reactive({
      b() {
        return 222
      },
      date: undefined,
      text: undefined,
    })
    const rend = function () {
      return <span style={{ color: '#f0f' }}>22222</span>
    }; // <span style={{color: '#f0f'}}>22222</span>
    const click = async () => {
      console.log(1111, formRef.value)
      console.log(3333, data)
    }
    // return {
    //   rend,
    //   click,
    //   columns,
    //   formData,
    //   formRef,
    // }
    return () => (<div>
      <div>aaaaa--{rend()}</div>
      <div>

        <el-input value={data.text} onInput={val => data.text = val}></el-input>
      </div>
      <a-range-picker value={data.date} onChange={val => data.date = val}></a-range-picker>
      <router-link to="/home">Go to home</router-link>
      <el-button type='primary' onClick={click}>click me</el-button>
      <el-button onClick={click}>click me</el-button>
    </div>)
  },
})
