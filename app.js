let app = new Vue({
  el: '#game',
  data: {
    hours: '00',
    minutes: '00',
    seconds: '00',
    hh: '00',
    mm: '00',
    ss: '00',
    initialDate: '',
    currentDate: '',
    count_x: 4,
    count_y: 4,
    counters: 0,
    counter: 0,
    start_block: true,
    start: true,
    win: false,
    stop: false,
    res: [],
    tables: [],
    el: '',
    timerId: '',
    isActive: false,
    cells: Array.apply(null, { length: 16 }).map(function (_, index) {
      return {
        id: index + 1,
        number: index + 1
      }
    })
  },
  methods: {
    load: function () {
      console.log('load')
      document.getElementById('16').querySelector('div').remove()
      $(() => {
        // $( ".cell" ).draggable({ delay: 250 });
        $('.draggable').draggable({
          containment: '.square', grid: [100, 100], opacity: 0.4, helper: 'clone',
          start: (e) => {
            console.log('start')
          },
          stop: (e) => {
            console.log('stop')
            this.el = e.target
            if (e.target.parentNode.classList.contains('can-be-moved')) {
              var elem = e.target
            } else {
              return
            }
            let els = this.el
            const el = document.querySelector('.empty')
            el.addEventListener('mouseover', mouseover)
            
            function mouseover (e) {
              console.log('add mouseover')
              if (e.target.classList.contains('empty')) {
                new Audio('sounds.mp3').play()
                elem.remove()
                $(e.target).append(els)
              }
              e.target.classList.remove('empty')
              e.target.classList.add('no-empty')
            }
            
            el.addEventListener('mouseout', mouseout)
            
            function mouseout () {
              console.log('mouseout')
              el.removeEventListener('mouseover', mouseover)
            }
            
            this.reBuild()
            this.counter++
          }
        })
      })
    },
    reset: function () {
      console.log('reset')
      this.start = !this.start
      this.start_block = !this.start_block
      this.stop = !this.stop
      this.counters = 0
      this.counter = 0
      document.querySelector('.secs').innerHTML = '00'
      document.querySelector('.mins').innerHTML = '00'
      document.querySelector('.hours').innerHTML = '00'
      
      Array.prototype.forEach.call(document.querySelectorAll('.cell'), function (el, i) {
        el.removeAttribute('style')
      })
      this.stopTimer()
    },
    restart: function () {
      console.log('restart')
      setTimeout(() => this.win = !this.win, 500)
      setTimeout(() => this.start_block = !this.start_block, 500)
      setTimeout(() => this.reset(), 500)
      setTimeout(() => this.shuffle(), 500)
    },
    startStopwatch: function () {
      this.initialDate = new Date
      this.timerId = setInterval(this.start_counter, 1000)
    },
    getTime: function () {
      this.currentDate = new Date
      timer = new Date(this.currentDate - this.initialDate)
      this.seconds = timer.getSeconds()
      this.minutes = timer.getMinutes()
      this.hours = timer.getUTCHours()
      if (this.seconds < 10) {
        this.seconds = '0' + this.seconds
      }
      if (this.minutes < 10) {
        this.minutes = '0' + this.minutes
      }
      if (this.hours < 10) {
        this.hours = '0' + this.hours
      }
    },
    start_counter: function () {
      this.getTime()
      document.querySelector('.secs').innerHTML = this.seconds
      document.querySelector('.mins').innerHTML = this.minutes
      document.querySelector('.hours').innerHTML = this.hours
    },
    stopTimer: function () {
      clearInterval(this.timerId)
    },
    comparisonNumbers: function () {
      console.log('comparisonNumbers')
      let timeout = () => {
        if (+$('#snaptarget > div:eq(0)').text() === 1 && +$('#snaptarget > div:eq(1)').text() === 2
          && +$('#snaptarget > div:eq(2)').text() === 3 && +$('#snaptarget > div:eq(3)').text() === 4
          && +$('#snaptarget > div:eq(4)').text() === 5 && +$('#snaptarget > div:eq(5)').text() === 6
          && +$('#snaptarget > div:eq(6)').text() === 7 && +$('#snaptarget > div:eq(7)').text() === 8
          && +$('#snaptarget > div:eq(8)').text() === 9 && +$('#snaptarget > div:eq(9)').text() === 10
          && +$('#snaptarget > div:eq(10)').text() === 11 && +$('#snaptarget > div:eq(11)').text() === 12
          && +$('#snaptarget > div:eq(12)').text() === 13 && +$('#snaptarget > div:eq(13)').text() === 14
          && +$('#snaptarget > div:eq(14)').text() === 15) {
          setTimeout(timeouts, 1000)
          new Audio('tada.mp3').play()
        }
      }
      setTimeout(timeout, 0)
      let timeouts = () => {
        this.start_block = true
        this.win = true
        this.stopTimer()
        this.tables.push({
          move: this.counter,
          time: document.querySelector('.hours').innerHTML + ' : ' +
            document.querySelector('.mins').innerHTML + ' : ' +
            document.querySelector('.secs').innerHTML
        })
      }
    },
    reBuild: function () {
      console.log('reBuild')
      
      function blockItem () {
        Array.prototype.forEach.call(document.querySelectorAll('.cell_parent'), function (el, i) {
          el.classList.remove('empty')
          el.classList.remove('can-be-moved')
          el.classList.add('no-empty')
        })
        if ($('#1 > div').length === 0) {
          $('#2, #5').addClass('can-be-moved')
          $('#1').addClass('empty').removeClass('no-empty')
        } else if ($('#2 > div').length === 0) {
          $('#1, #3, #6').addClass('can-be-moved')
          $('#2').addClass('empty').removeClass('no-empty')
        } else if ($('#3 > div').length === 0) {
          $('#2, #4, #7').addClass('can-be-moved')
          $('#3').addClass('empty').removeClass('no-empty')
        } else if ($('#4 > div').length === 0) {
          $('#3, #8').addClass('can-be-moved')
          $('#4').addClass('empty').removeClass('no-empty')
        } else if ($('#5 > div').length === 0) {
          $('#1, #6, #9').addClass('can-be-moved')
          $('#5').addClass('empty').removeClass('no-empty')
        } else if ($('#6 > div').length === 0) {
          $('#2, #5, #7, #10').addClass('can-be-moved')
          $('#6').addClass('empty').removeClass('no-empty')
        } else if ($('#7 > div').length === 0) {
          $('#3, #6, #8, #11').addClass('can-be-moved')
          $('#7').addClass('empty').removeClass('no-empty')
        } else if ($('#8 > div').length === 0) {
          $('#4, #7,#12').addClass('can-be-moved')
          $('#8').addClass('empty').removeClass('no-empty')
        } else if ($('#9 > div').length === 0) {
          $('#5, #10,#13').addClass('can-be-moved')
          $('#9').addClass('empty').removeClass('no-empty')
        } else if ($('#10 > div').length === 0) {
          $('#6, #9, #11, #14').addClass('can-be-moved')
          $('#10').addClass('empty').removeClass('no-empty')
        } else if ($('#11 > div').length === 0) {
          $('#7, #10, #12, #15').addClass('can-be-moved')
          $('#11').addClass('empty').removeClass('no-empty')
        } else if ($('#12 > div').length === 0) {
          $('#8, #11, #16').addClass('can-be-moved')
          $('#12').addClass('empty').removeClass('no-empty')
        } else if ($('#13 > div').length === 0) {
          $('#9, #14').addClass('can-be-moved')
          $('#13').addClass('empty').removeClass('no-empty')
        } else if ($('#14 > div').length === 0) {
          $('#10, #13, #15').addClass('can-be-moved')
          $('#14').addClass('empty').removeClass('no-empty')
        } else if ($('#15 > div').length === 0) {
          $('#11, #14, #16').addClass('can-be-moved')
          $('#15').addClass('empty').removeClass('no-empty')
        } else if ($('#16 > div').length === 0) {
          $('#12, #15').addClass('can-be-moved')
          $('#16').addClass('empty').removeClass('no-empty')
        }
      }
      
      setTimeout(blockItem, 1000)
      this.comparisonNumbers()
    },
    shuffle: function () {
      console.log('shuffle')
      this.cells = _.shuffle(this.cells)
      this.start = !this.start
      this.start_block = !this.start_block
      this.stop = !this.stop
      setTimeout(() => Array.prototype.forEach.call(document.querySelectorAll('.cell_parent'), function (el, i) {
        el.removeAttribute('id')
        el.setAttribute('id', i + 1)
      }), 100)
      this.reBuild()
      this.startStopwatch()
    }
  },
  mounted: function () {
    this.load()
    this.cells = _.shuffle(this.cells)
  }
})
