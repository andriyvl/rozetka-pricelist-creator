import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    loading: false,
    Home: { title: 'Home', path: '/', icon: 'fa-home' },
    Editor: { title: 'Editor', path: '/editor', icon: 'fa-edit' },
    SignUp: { title: 'Sign Up', path: '/signup', icon: 'fa-user-plus' },
    SignIn: { title: 'Sign In', path: '/signin', icon: 'fa-sign-in-alt' },
    validationRules: {
      isNumber: [
        v => !!v || 'ID is required!',
        v => !isNaN(v) || 'ID should be a number'
      ]
    },
    mainData: {
      curPriceList: '',
      priceLists: [],
      priceListSet: 'N',
      priceListCompleted: false
    },
    curPriceListData: {
      config: {
        curOfferKey: 0, // index of array
        tempOfferId: '', // used in ID manual edit field to check if id already exist.
        lastID: '00001', // last used ID
        miniOfferSetup: {
          Pars: [],
          Props: {
            // Offer_Id: true,
            Available: true,
            Name: true,
            Picture: true,
            Stock_Quantity: true,
            // Category_Id: true,
            Url: false,
            Price: false,
            Currency_Id: false,
            Vendor: false
          }
        }
      },
      xmlValues: {
        Xml: {
          Version: '1.0',
          Encoding: 'UTF-8'
        },
        YmlDate: '2018-12-19 18:00' /* todo take todays date and time */,
        Name: 'Eternity',
        Company: 'Eternity',
        Url: '',
        Curs: {
          0: {
            Id: 'UAH',
            Rate: '1'
          }
        },
        Cat: {
          0: {
            Id: '1',
            Name: '',
            Child: {}
          }
        },
        Offers: {
          0: {
            Available: 'true',
            Id: '00001',
            data: {
              Url: 'www.viychuklingerie.com',
              Price: '850',
              CurId: 'UAH',
              CatId: '1',
              Pics: {
                0: 'https://raw.githubusercontent.com/viylingerie/Photo/master/Elena%20silk.blck1.JPG'
              },
              Name: 'Name of Offer',
              Vendor: 'Eternity',
              Descr: `<p>Нижнее белье<b>Eternity</b>Интернет магазин Eternity представляет украинский бренд нижнего женского белья Viychuk lingerie создан в 2015 году.
  Мы представлены в нескольких городах Украины, Черновцы, Львов, Киев.
  Наша цель - создавать комфорт и эстетику в повседневной жизни женщины, красивое белье создано не только для "особого дня" а для того чтобы Вы в нем жили.
  С каждой коллекцией мы добавляем новые модели в наш ассортимент. </p>
  <p> Теперь у нас можно приобрести белье с мягкими чашками, белье с косточками, купальники - целый год, боди и шелковые накидки. </p>
  <p> Viychuk lingerie <b> New Collection </b> Комплект Elena silk создает ваш комфорт и нежность</p>` /* todo text editor? */,
              Pars: {
                0: {
                  Name: 'Вид',
                  Descr: ''
                },
                1: {
                  Name: 'Размер',
                  Descr: ''
                } /* todo choises */,
                2: {
                  Name: 'Чашка',
                  Descr: ''
                },
                3: {
                  Name: 'Категория',
                  Descr: ''
                },
                4: {
                  Name: 'Цвет',
                  Descr: 'Синий'
                } /* todo choises */,
                5: {
                  Name: 'Застежка',
                  Descr: ''
                },
                6: {
                  Name: 'Посадка трусиков',
                  Descr: ''
                },
                7: {
                  Name: 'Бретели',
                  Descr: ''
                },
                8: {
                  Name: 'Материал',
                  Descr: ''
                },
                9: {
                  Name: 'Состав',
                  Descr: ''
                },
                10: {
                  Name: 'Страна-производитель',
                  Descr: ''
                },
                11: {
                  Name: 'Доставка/Оплата',
                  Descr: ''
                }
              },
              StockQ: '5'
            }
          }
        }
      }
    },
    PriceListDataTemplate: {
      config: {
        curOfferKey: 0, // index of array
        tempOfferId: '', // used in ID manual edit field to check if id already exist.
        lastID: '00001', // last used ID
        miniOfferSetup: {
          Pars: [''],
          Props: {
            // Offer_Id: true,
            Available: true,
            Name: true,
            Picture: true,
            Stock_Quantity: true,
            // Category_Id: true,
            Url: false,
            Price: false,
            Currency_Id: false,
            Vendor: false
          }
        }
      },
      xmlValues: {
        Xml: {
          Version: '1.0',
          Encoding: 'UTF-8'
        },
        YmlDate: '2018-12-19 18:00' /* todo take todays date and time */,
        Name: 'Назва Магазину',
        Company: 'Назва Компанії',
        Url: 'www.адрес-вашого-сайту.домен',
        Curs: {
          0: {
            Id: 'UAH',
            Rate: '1'
          }
        },
        Cat: {
          0: {
            Id: '1',
            Name: 'Верхній одяг',
            Child: {
              0: {
                Id: '101',
                Name: 'Сорочки',
                Child: {
                  0: {
                    Id: '1011',
                    Name: 'Спідні сорочки',
                    Child: {
                      0: {
                        Id: '1012',
                        Name: 'Cпідні сорочки без рукавів'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        Offers: {
          0: {
            Available: 'true',
            Id: '00001',
            data: {
              Url: 'www.адрес-вашого-сайту.домен',
              Price: '850',
              CurId: 'UAH',
              CatId: '101',
              Pics: {
                0: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Blue_Tshirt.jpg'
              },
              Name: 'Назва продукту',
              Vendor: 'Виробник продукту',
              Descr: `<p>Синя футболка з круглим вирізом <b>Назва Бренду</b> Круглий виріз, короткі рукави, однотонний дизайн, точне співвідношення розміру 100% бавовна Машинне прання</p>` /* todo text editor? */,
              Pars: {
                0: {
                  Name: 'Вид',
                  Descr: ''
                },
                1: {
                  Name: 'Розмір',
                  Descr: 'М'
                } /* todo choises */,
                2: {
                  Name: 'Категорія',
                  Descr: ''
                },
                3: {
                  Name: 'Колір',
                  Descr: 'Синій'
                } /* todo choises */,
                4: {
                  Name: 'Матеріал',
                  Descr: 'Бавовна 100%'
                },
                5: {
                  Name: 'Склад',
                  Descr: ''
                },
                6: {
                  Name: 'Країна виробник',
                  Descr: 'Україна'
                },
                7: {
                  Name: 'Доставка/Оплата',
                  Descr: 'Укрпошта'
                }
              },
              StockQ: '5'
            }
          }
        }
      }
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    /* setMainData (state, payload) {
      console.log(state.mainData)
      state.mainData = payload
      console.log(state.mainData)
      console.log(state.curPriceListData.xmlValues)
    }, */
    setConfig (state, payload) {
      state.curPriceListData.config = payload
      console.log(state.curPriceListData.config)
    },
    setXmlValues (state, payload) {
      state.curPriceListData.xmlValues = payload
      console.log(state.curPriceListData.xmlValues)
    },
    addNewOffer (state, payload) {
      state.curPriceListData.xmlValues.Offers[payload.key] = payload.tempOffer
      state.curPriceListData.xmlValues.Offers = Object.assign({}, state.curPriceListData.xmlValues.Offers)
    },
    addOption (state, payload) {
      Vue.set(payload.path, payload.key, payload.newEl)
    },
    deleteOffer (state, payload) {
      delete state.curPriceListData.xmlValues.Offers[payload.curI]
      state.curPriceListData.xmlValues.Offers = Object.assign({}, Object.values(state.curPriceListData.xmlValues.Offers))
    },
    deleteOption (state, payload) { // to be improved
      Vue.delete(payload.path, payload.key)
      let assignKeys = Object.assign({}, Object.values(payload.path))
      for (let k in assignKeys) {
        Vue.set(payload.path, k, assignKeys[k])
      }
      if (parseInt(payload.key) < (Object.keys(payload.path).length - 1)) {
        // fix for deleting last item
        let last = Object.keys(payload.path).length - 1
        Vue.delete(payload.path, last)
      }
    },
    setCurOfferKey (state, payload) {
      state.curPriceListData.config.curOfferKey = payload
    },
    setOffer (state, payload) {
      state.curPriceListData.xmlValues.Offers[payload.sourceKey] = payload.obj
    },
    setPriceLists (state, payload) {
      state.mainData.priceLists = payload
    },
    createFromTemplate (state, payload) {
      Vue.delete(state, 'curPriceListData')
      let obj
      obj = JSON.parse(JSON.stringify(state.PriceListDataTemplate))
      Vue.set(state, 'curPriceListData', obj)
    },
    setUnSetPriceList (state, payload) {
      state.mainData.curPriceList = payload.cur
      state.mainData.priceListSet = payload.set
      state.mainData.priceListCompleted = payload.done
    },
    addPriceListToArray (state, payload) {
      state.mainData.priceLists = payload
    },
    deletePriceListFromArray (state, payload) {
      let ind = state.mainData.priceLists.indexOf(payload)
      state.mainData.priceLists.pop(ind)
    },
    priceListCompleted (state) {
      state.mainData.priceListCompleted = true
    }
  },
  actions: {
    addNewOfferAction ({ commit }, payload) {
      commit('addNewOffer', { key: payload.key, tempOffer: payload.tempOffer })
    },
    addOptionAction ({ commit }, payload) {
      commit('addOption', payload)
    },
    deleteOfferAction ({ commit }, payload) {
      commit('deleteOffer', payload)
    },
    deleteOptionAction ({ commit }, payload) {
      commit('deleteOption', payload)
    },
    userSignUp ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email })
          commit('setLoading', false)
          commit('setError', null)
          router.push('/home')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignIn ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email })
          commit('setLoading', false)
          commit('setError', null)
          router.push('/')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', { email: payload.email })
    },
    userSignOut ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    },
    getDataFromFB ({ state, commit, dispatch }, payload) {
      let userid = firebase.auth().currentUser.uid
      let cur = state.mainData.curPriceList
      firebase.database().ref('/users/' + userid + '/data' + '/' + cur).once('value').then(function (snapshot) {
        let tempdata = snapshot.val()
        if (tempdata) {
          let xmlData = tempdata.xmlValues
          let configData = tempdata.config
          const iterate = (obj) => {
            Object.keys(obj).forEach(key => {
              if (Array.isArray(obj[key])) {
                obj[key] = { ...obj[key] }
              }
              if (typeof obj[key] === 'object') {
                iterate(obj[key])
              }
            })
          }
          iterate(xmlData)
          // tempdata.priceLists = { ...tempdata.priceLists } // same as object assign
          commit('setXmlValues', xmlData)
          commit('setConfig', configData)
        } else {
          console.log('else create from template')
          commit('createFromTemplate')
          dispatch('setDataToFB')
        }
      })
      commit('priceListCompleted')
    },
    getPriceLists ({ state, commit }, payload) {
      let userid = firebase.auth().currentUser.uid
      firebase.database().ref('/users/' + userid + '/mainData/priceLists').once('value').then(function (snapshot) {
        let tempdata = snapshot.val()
        if (tempdata !== (undefined || null)) {
          let priceListsAddedFlag = []
          tempdata.forEach(element => {
            element['flag'] = false
            priceListsAddedFlag.push(element)
          })
          commit('setPriceLists', priceListsAddedFlag)
        } else {
          commit('setPriceLists', [{ name: 'PriceList1', description: 'Sample Description', flag: false }])
        }
      })
    },
    setDataToFB ({ state, commit, dispatch }, payload) {
      let userid = firebase.auth().currentUser.uid
      let cur = state.mainData.curPriceList
      firebase.database().ref('/users/' + userid + '/data/' + cur).set({
        ...state.curPriceListData
        // curPriceList: state.mainData.curPriceList,
        // priceLists: state.mainData.priceLists,
        // curOfferKey: state.curPriceListData.config.curOfferKey,
        // tempOfferId: state.curPriceListData.config.tempOfferId,
        // lastID: state.curPriceListData.config.lastID
      })
      dispatch('setPriceListsToFB')
    },
    setPriceListsToFB ({ state, commit }, payload) {
      let userid = firebase.auth().currentUser.uid
      let priceListsRemovedFlag = []
      state.mainData.priceLists.forEach(element => {
        delete element['flag']
        priceListsRemovedFlag.push(element)
      })
      firebase.database().ref('/users/' + userid + '/mainData/priceLists').set({
        ...priceListsRemovedFlag
      })
    },
    deletePriceListAction ({ state, commit, dispatch }, payload) {
      let userid = firebase.auth().currentUser.uid
      for (let i = 0; i < payload.length; i++) {
        console.log(payload[i])
        firebase.database().ref('/users/' + userid + '/data/').child(state.mainData.priceLists[payload[i]].name).remove()
        commit('deletePriceListFromArray', payload[i])
      }
      commit('setUnSetPriceList', { cur: '', set: 'N', done: false })
      dispatch('setPriceListsToFB')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    },
    mainData (state) {
      return state.mainData
    },
    xmlValues (state) {
      return state.curPriceListData.xmlValues
    },
    getOffer: (state) => (key) => {
      return state.curPriceListData.xmlValues.Offers[key]
    },
    getParams (state) {
      return state.curPriceListData.xmlValues.Offers[0].data.Pars
    }
  }

})
