const searchProcess = require('../processes/searchProcess')

const search = async (req, res) => {
  try {
    const result = await searchProcess.processSearch(req.query)
    res.json(result)
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  search
}