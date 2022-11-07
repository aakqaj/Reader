<template>
  <div id="content-box">
    <div class="title">
      <h4>{{ chapterName() }}</h4>
    </div>
    <div class="show">
      <div class="book-content">
        <div class="reading"></div>
      </div>
    </div>

    <div class="footer">
      <div class="shedule">
        {{
          `${((getCursor(bookDetail.BookName) / bookDetail.ChapterList.length) * 100).toFixed(2)}%`
        }}
      </div>
      <div class="chapter-name">{{ chapterName() }}</div>
      <div class="shedule-this">
        {{ `${readingPage + 1} / ${readingPageCount + 1}` }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from 'animejs'
import { computed, onMounted, onBeforeUnmount, ref, defineProps, watch, toRaw } from 'vue'
import { getCursor } from '../assets/utils/requestBookCursor'
import { replceContentByRegSource } from '../assets/utils/readReplaceReg'
import { useStore } from 'vuex'

import { debounce } from '../assets/utils/utils'
import { mittBus } from '../assets/lib/mittBus'
import { getFontFamily, getFontSize, getThem, setStyle } from '../assets/utils/api/readStyle'
import { BookStyle } from '../assets/interface/Style'

// 书籍信息载入
const store = useStore()
const props = defineProps(['content'])
const bookDetail = toRaw(computed(() => store.state.BookDetails.bookDetail).value)

//工具栏状态开关
const showTools = computed(() => store.state.BookState.showTools)

// 阅读进度计数
const readingPageCount = ref(0)
const readingPage = ref(0)

// 动画时长 毫秒
const animeDuration = 500

const titleFontFamily = ref('Hongyun')
const contentFontFamily = ref('Xingkai')
const titleFontsize = ref('32px')
const contentFontsize = ref('28px')
const bgcolor = ref('hsl(0, 0%, 21%)')
const fontColor = ref('#ffffff')

const scroll = debounce(function (e: any) {
  e.preventDefault()

  if (e.wheelDelta < 0) {
    turnRight()
  } else if (e.wheelDelta > 0) {
    turnLeft()
  }
}, 250)

onMounted(async () => {
  const contentEl = document.querySelector('#content-box')
  if (contentEl) {
    contentEl.addEventListener('wheel', scroll)
  }
  // 快捷键呼出工具栏
  keyListener('Escape', function () {
    changeShowTools()
  })

  keyListener('Space', function () {
    turnRight()
  })

  keyListener('ArrowRight', function () {
    turnRight()
  })
  keyListener('ArrowLeft', function () {
    turnLeft()
  })

  setTimeout(() => {
    const readingEle: any = document.querySelector('.reading')

    const scrollWidth = readingEle.scrollWidth
    let pageWidth = readingEle.offsetWidth + 20
    readingPageCount.value = Math.floor(scrollWidth / pageWidth)

    let resizeTag = true
    window.onresize = () => {
      if (resizeTag) {
        resizeTag = false
        setTimeout(() => {
          const scrollWidth = readingEle.scrollWidth
          let pageWidth = readingEle.offsetWidth + 20
          readingPageCount.value = Math.floor(scrollWidth / pageWidth)
          if (readingPage.value > readingPageCount.value) {
            readingPage.value = 0
          }
          resizeTag = true
        }, 100)
      }
    }
  }, 10)
})

watch(
  () => toRaw(props.content),
  (old) => {
    let readingEl = document.querySelector('.reading')
    if (readingEl) {
      readingEl.innerHTML = replceContentByRegSource(bookDetail.BookName, old[1])
      const readingEle: any = document.querySelector('.reading')
      const scrollWidth = readingEle.scrollWidth
      const pageWidth = readingEle.offsetWidth + 20
      readingPageCount.value = Math.floor(scrollWidth / pageWidth)
      if (readingPage.value > readingPageCount.value) {
        readingPage.value = 0
      }
    }
  }
)

// 防止mittBus多次触发
onBeforeUnmount(() => {
  console.log('注销')

  mittBus.all.delete('reloadStyle')

  const contentEl = document.querySelector('#content-box')
  if (contentEl) {
    contentEl.removeEventListener('wheel', scroll)
  }
  document.onkeyup = null
})

initSyle()

mittBus.on('reloadStyle', (style: any) => {
  titleFontFamily.value = (style as BookStyle).Font.TitleFontFamily || 'Roboto'
  contentFontFamily.value = (style as BookStyle).Font.ContentFontFamily || 'Roboto'
  titleFontsize.value = (style as BookStyle).Font.TitleSize + 'px'
  contentFontsize.value = (style as BookStyle).Font.ContentSize + 'px'
  bgcolor.value = (style as BookStyle).Them.BackgroundColor
  fontColor.value = (style as BookStyle).Them.FontColor

  setStyle(style)
})

async function initSyle() {
  titleFontFamily.value = (await getFontFamily()).titleFamily || 'Roboto'
  contentFontFamily.value = (await getFontFamily()).contentFamily || 'Roboto'
  titleFontsize.value = (await getFontSize()).titleSize + 'px'
  contentFontsize.value = (await getFontSize()).contentSize + 'px'
  bgcolor.value = (await getThem()).BackgroundColor
  fontColor.value = (await getThem()).FontColor
}

function chapterName() {
  return bookDetail.ChapterList[getCursor(bookDetail.BookName)].ChapterName
}

function changeShowTools() {
  store.commit('setStateShowTools', !showTools.value)
}
function turnRight() {
  const readingEle: any = document.querySelector('.reading')
  const scrollWidth = readingEle.scrollWidth
  let pageWidth = readingEle.offsetWidth + 20
  readingPageCount.value = Math.floor(scrollWidth / pageWidth)

  if (readingPage.value >= 0 && readingPage.value <= readingPageCount.value) {
    if (readingPage.value == 0) {
      // pageWidth = pageWidth - 10;
    }

    if (readingPage.value === readingPageCount.value) {
      store.dispatch('setCursor', getCursor(bookDetail.BookName) + 1)
      readingPage.value = 0
      const r: any = document.querySelector('.reading')

      let p = r.offsetWidth + 20

      anime({
        targets: '.reading',
        translateX: [`${p}px`, 0],
        easing: 'easeInOutQuad',
        duration: animeDuration,
        opacity: [0, 1]
      })
      readingPage.value = 0
    } else {
      anime({
        targets: '.reading',
        translateX: `${-(readingPage.value + 1) * pageWidth}px`,
        easing: 'easeInOutQuad',
        duration: animeDuration
      })

      readingPage.value += 1
    }
  }
}

function turnLeft() {
  const readingEle: any = document.querySelector('.reading')
  const scrollWidth = readingEle.scrollWidth
  let pageWidth = readingEle.offsetWidth + 20
  readingPageCount.value = Math.floor(scrollWidth / pageWidth)

  if (readingPage.value > 0 && readingPage.value <= readingPageCount.value) {
    anime({
      targets: '.reading',
      translateX: `${-(readingPage.value - 1) * pageWidth}px`,
      easing: 'easeInOutQuad',
      duration: animeDuration
    })

    readingPage.value -= 1
  } else if (readingPage.value === 0) {
    if (getCursor(bookDetail.BookName) === 0) {
      return
    }
    store.dispatch('setCursor', getCursor(bookDetail.BookName) - 1)
    const r: any = document.querySelector('.reading')
    let p = r.offsetWidth + 20

    const readingEle: any = document.querySelector('.reading')
    let pageWidth = readingEle.offsetWidth + 20
    // readingPageCount.value = Math.floor(scrollWidth / pageWidth);

    // 等待watch重新计算载入的html
    setTimeout(() => {
      readingPage.value = readingPageCount.value

      anime({
        targets: '.reading',
        translateX: [
          `${-(readingPage.value + 1) * pageWidth}px`,
          `${-readingPage.value * pageWidth}px`
        ],
        easing: 'easeInOutQuad',
        duration: animeDuration,
        opacity: [0, 1]
      })
    }, 10)
  }
}

interface KeyFun {
  keyName: string
  fun: Function
}
const keyFun: KeyFun[] = []

function keyListener(key: string, callback: Function) {
  if (!keyFun.some((item) => item.keyName === key)) {
    keyFun.push({
      keyName: key,
      fun: callback
    })
  }

  document.onkeyup = (e) => {
    
    e.preventDefault()
    keyFun.filter((item) => {
      if (e.code === item.keyName) {
        item.fun()
      }
    })
  }
}
</script>

<style lang="scss">
#content-box {
  width: 100%;
  height: 100%;
  position: relative;

  background-color: v-bind(bgcolor);
  color: v-bind(fontColor);
}

.show {
  font-family: v-bind(contentFontFamily);
  font-size: v-bind(contentFontsize);

  overflow: scroll;
  overflow-x: hidden;
}

.book-content {
  height: 100%;
}

.reading {
  height: 100%;
  column-gap: 20px;
  z-index: 10;
}

.title {
  margin: 0 auto;

  text-align: center;
  font-size: v-bind(titleFontsize);
  z-index: 20;

  h4 {
    margin: 0;
    padding: 0;

    font-family: v-bind(titleFontFamily);
  }
}

.title {
  height: 5vh;
}

.show {
  height: 90vh;
}

.footer {
  height: 5vh;
  margin: 0;
}

.footer {
  position: absolute;
  width: 100%;
  bottom: 0;

  color: hsl(0, 0%, 50%);

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;

  align-items: center;
  justify-items: center;
}

.show {
  margin-left: 88px;
  margin-right: 88px;
}

.reading {
  columns: calc(100vw - 40px);
}

@media only screen and (min-width: 1514px) {
  .show {
    margin-left: 28px;
    margin-right: 28px;
  }
  .reading {
    margin: 0px 20px;
    columns: calc(100vw - 980px);
  }
}

@media only screen and (min-width: 1836px) {
  .show {
    margin-left: 280px;
    margin-right: 280px;
  }
  .reading {
    margin: 0px 20px;
    columns: calc(100vw - 1350px);
  }
}

@media only screen and (min-width: 2000px) {
  .show {
    margin-left: 280px;
    margin-right: 280px;
  }
  .reading {
    margin: 0px 20px;
    columns: calc(100vw - 1590px);
  }
}
</style>
