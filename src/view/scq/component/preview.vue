<script>
// <template>
//   <div>
//     <!-- <div
//       @click.stop="actionClick"
//       class="preview flex"
//       :class="{'row':dataset.direction=='row',
//     'column':dataset.direction=='column',
//     'selected':onSelected,
//     [dataset.className]:true
//     }"
//       :style="dataset.style"
//     >
//       <span class="status-bar">{{dataset.direction}}</span>
//       <template v-if="dataset.subset!=undefined">
//         <preview
//           v-for="item,index in dataset.subset"
//           :dataset="item"
//           :current_length="clength"
//           :key="index"
//           :tagType="item.tagType"
//           :direction="item.direction"
//           v-on:current="getCurrent"
//           :currentSelect="currentSelect"
//         ></preview>
//       </template>
//     </div> -->
//     {{}}
//   </div>
// </template>
// import HelloWorld from "./components/HelloWorld";
import classname from 'classname'
function formatStyle(obj) {
  let res = ''
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key]
      res += `${key}:${element};`
    }
  }
}
function getSelectedStatus(dataset, currentSelect) {
  let result = currentSelect.find(item => {
    return item == dataset.id
  })
  // console.log('getSelectedStatus', result)
  return result != undefined ? true : false
}
export default {
  name: 'preview',
  props: [
    'isHide',
    'dataset',
    'current_length',
    'direction',
    'currentSelect',
    'tagType'
  ],
  data() {
    return {
      clength: 1
    }
  },
  render: function(createElement) {
    let r = this.getElement(createElement, this.dataset)

    return r
  },
  methods: {
    getElement(createElement, dataset) {
      console.log('getElement 111')
      let sub = []
      if (!this.isHide) {
        sub.push(
          createElement(
            'span',
            { attrs: { class: 'status-bar' } },
            dataset.direction
          )
        )
      }
      for (let index = 0; index < dataset.subset.length; index++) {
        const element = dataset.subset[index]
        sub.push(this.getElement(createElement, element))
      }
      let eee = createElement(
        dataset.tagType || 'div',
        {
          on: {
            click: event => {
              this.actionClick(dataset)
              event.stopPropagation()
            }
          },
          attrs: {
            class: classname({
              row: dataset.direction == 'row',
              column: dataset.direction == 'column',
              selected:
                getSelectedStatus(dataset, this.currentSelect) && !this.isHide,
              [dataset.className]: true,
              [dataset.levelClassName]: true,

              preview: true,
              flex: true
            }),
            style: formatStyle(dataset.style),
            ...dataset.raw
          }
        },
        sub
      )
      console.log('getElement', eee)
      return eee
    },
    actionClick(dataset) {
      // console.log(this.dataset.id)
      this.$emit('current', { id: dataset.id, tagType: dataset.tagType })
    },
    getCurrent(event) {
      this.$emit('current', event)
    }
  },
  computed: {
    onSelected() {
      let result = this.currentSelect.find(item => {
        return item == this.dataset.id
      })
      return result != undefined ? true : false
    }
  },
  updated: function() {
    //   计算当前自己元素数量
    // console.log(this.dataset.subset.length)
    this.clength = this.dataset.subset && this.dataset.subset.length

    // console.log(this.current_length)
  }
}
</script>
<style >
span.status-bar {
  position: absolute;
  left: 0;
  top: 0;
  /* display: inherit; */
  border: 1px solid #1000ff;
  margin: 2px;
  padding: 2px;
}

.preview {
  position: relative;
}
</style>