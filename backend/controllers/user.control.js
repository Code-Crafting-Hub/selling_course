const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
  } catch (error) {
    console.log("Error in user signup ", error);
    res.json({ errors: "Internal server error" });
  }
};

module.exports = { signup };
