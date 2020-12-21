
export const ingeApi = {
  navigateTo(arg) {
    return uni.navigateTo
  },
  redirectTo(args) {
    return uni.redirectTo
  },
  reLaunch(args) {
    return uni.reLaunch(args)
  },
  switchTab(args) {
    return uni.switchTab(args)
  },
  navigateBack(args) {
    return uni.navigateBack(args)
  },
  request(args) {
    return uni.request(args)
  },
  uploadFile(args) {
    return uni.uploadFile(args)
  },
  downloadFile(args) {
    return uni.downloadFile(args)
  },
  setStorage(args) {
    return uni.setStorage(args)
  },
  setStorageSync(key, data) {
    return uni.setStorageSync(key, data)
  },
  getStorage(args) {
    return uni.getStorage(args)
  },
  getStorageSync(key) {
    return uni.getStorageSync(key)
  },
  getStorageInfo(obj) {
    return uni.getStorageInfo(obj)
  },
  getStorageInfoSync() {
    return uni.getStorageInfoSync()
  },
  removeStorage(obj) {
    return uni.removeStorage(obj)
  },
  removeStorageSync(key) {
    return uni.removeStorageSync(key)
  },
  clearStorage() {
    return uni.clearStorage()
  },
  clearStorageSync() {
    return uni.clearStorageSync()
  },
  startPullDownRefresh(obj) {
    return uni.startPullDownRefresh(obj)
  },
  stopPullDownRefresh(obj) {
    return uni.stopPullDownRefresh(obj)
  },
  login(obj) {
    return uni.login(obj)
  },
  getUserInfo(obj) {
    return uni.getUserInfo(obj)
  },
  requestPayment(obj) {
    return uni.requestPayment(obj)
  },
  showToast(obj) {
    return uni.showToast(obj)
  },
  hideToast() {
    return uni.hideToast()
  },
  showLoading(obj) {
    return uni.showLoading(obj)
  },
  hideLoading() {
    return uni.hideLoading()
  },
  showModal(obj) {
    return uni.showModal(obj)
  },
  setNavigationBarTitle(arg) {
    return uni.setNavigationBarTitle(arg)
  },
  chooseImage(arg) {
    return uni.chooseImage(arg)
  },
  getImageInfo(arg) {
    return uni.getImageInfo(arg)
  },
  getSystemInfoSync(arg) {
    return uni.getSystemInfoSync(arg)
  },
  upx2px(arg) {
    return uni.upx2px(arg)
  },
  previewImage(arg) {
    return uni.previewImage(arg)
  },
  chooseAddress(arg) {
    return uni.chooseAddress(arg)
  },
  checkSession(arg) {
    return uni.checkSession(arg)
  },
  createSelectorQuery(arg) {
    return uni.createSelectorQuery(arg)
  },
  setTabBarBadge(arg) {
    return uni.setTabBarBadge(arg)
  },
  setNavigationBarColor(arg) {
    return uni.setNavigationBarColor(arg)
  },
  setClipboardData(arg) {
    return uni.setClipboardData(arg)
  },
  pageScrollTo(arg) {
    return uni.pageScrollTo(arg)
  },
  removeTabBarBadge(arg) {
    return uni.removeTabBarBadge(arg)
  },
  hideShareMenu(arg) {
    return uni.hideShareMenu(arg)
  },
  showShareMenu(arg) {
    return uni.showShareMenu(arg)
  },
  getClipboardData(arg) {
    return uni.getClipboardData(arg)
  },
  chooseAndUploadImg({
    url,
    count = 1,
    sizeType = ['original', 'compressed'],
    sourceType = ['album'],
    name,
    formData,
    header
  }) {
    return new Promise((resolve, reject) => {
      try {
        ingeApi.chooseImage({
          count,
          sizeType,
          sourceType,
          success: async(chooseImageRes) => {
            // 上传图片
            if (chooseImageRes.tempFilePaths.length) {
              const resultArr = []
              try {
                for (let index = 0; index < chooseImageRes.tempFilePaths.length; index++) {
                  const element = chooseImageRes.tempFilePaths[index]
                  resultArr.push(await ingeApi.uploadFileAsync({
                    url,
                    name,
                    formData,
                    header,
                    filePath: element
                  }))
                }
              } catch (error) {
                console.log(error, 'for error')
              }
              resolve(resultArr)
            } else {
              resolve([])
            }
          },
          fail: () => {
            console.log('chooseimg fail')
            resolve([])
          }

        })
      } catch (error) {
        console.log(error, 'error chooseimg')
      }
    })
  },
  uploadFileAsync({
    url,
    name,
    formData,
    header,
    filePath
  }) {
    return new Promise((resolve, reject) => {
      const uploadTask = uni.uploadFile({
        url,
        filePath,
        name,
        formData,
        header,
        success: (uploadFileRes) => {
          let data = {}
          if (uploadFileRes.data) {
            if (typeof uploadFileRes.data === 'string') { data = JSON.parse(uploadFileRes.data) }
          }
          resolve(data)
        },
        fail: (error) => {
          console.log(error, 'upload error')
          reject('上传文件失败')
        }
      })

      uploadTask.onProgressUpdate((res) => {
        ingeApi.showToast({
          title: res.progress + '%',
          icon: 'none'
        })
      })
    })
  }
}
