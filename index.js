module.exports = {

  name: 'Project',

  description: 'React Project',

  directory: true,

  params: ['Name'],

  rules: function (config) {
    return ({
      items: [
        {
          destinationFile: '/',
          sourceContentFile: '/'
        }
      ]
    })
  }
}
