const auth = async (req,res,next) => {
  console.log('authenticate user middleware');
  next()
}

export default auth