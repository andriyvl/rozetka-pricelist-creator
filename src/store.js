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
    mainData: {
      curPriceList: 0,
      priceLists: { 0: 'pricelist1', 1: 'pricelist2' }
    },
    xmlValues: {
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
          Name: 'Trusiki',
          Child: {
            0: { Id: '101', Name: 'Trusy' }
          }
        },
        1: {
          Id: '2',
          Name: 'Pusiki',
          Child: {
            0: { Id: '201', Name: 'Pussy' }
          }
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
    setMainData (state, payload) {
      console.log(state.mainData)
      state.mainData = payload
      console.log(state.mainData)
      console.log(state.xmlValues)
    },
    setXmlValues (state, payload) {
      state.xmlValues = payload
      console.log(state.xmlValues)
    },
    addNewOffer (state, payload) {
      state.xmlValues.Offers[payload.key] = payload.tempOffer
      state.xmlValues.Offers = Object.assign({}, state.xmlValues.Offers)
    },
    addOption (state, payload) {
      Vue.set(payload.path, payload.key, payload.newEl)
    },
    deleteOffer (state, payload) {
      delete state.xmlValues.Offers[payload.curI]
      state.xmlValues.Offers = Object.assign({}, Object.values(state.xmlValues.Offers))
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
      state.xmlValues.config.curOfferKey = payload
    },
    setOffer (state, payload) {
      state.xmlValues.Offers[payload.sourceKey] = payload.obj
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
    getDataFromFB ({ commit }, payload) {
      let userid = firebase.auth().currentUser.uid
      firebase.database().ref('/users/' + userid + '/xmlValues').once('value').then(function (snapshot) {
        let tempdata = snapshot.val()
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
        iterate(tempdata)
        // tempdata.priceLists = { ...tempdata.priceLists } // same as object assign
        commit('setXmlValues', tempdata)
      })
    },
    setDataToFB ({ state, commit }, payload) {
      let userid = firebase.auth().currentUser.uid
      firebase.database().ref('/users/' + userid + '/' + 'xmlValues').set({
        ...state.xmlValues
        // curPriceList: state.mainData.curPriceList,
        // priceLists: state.mainData.priceLists,
        // curOfferKey: state.xmlValues.config.curOfferKey,
        // tempOfferId: state.xmlValues.config.tempOfferId,
        // lastID: state.xmlValues.config.lastID
      })
      firebase.database().ref('/users/' + userid + '/' + 'mainData').set({
        ...state.mainData
      })
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
      return state.xmlValues
    },
    getOffer: (state) => (key) => {
      return state.xmlValues.Offers[key]
    },
    getParams (state) {
      return state.xmlValues.Offers[0].data.Pars
    }
  }
})
