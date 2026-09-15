const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const result = await authService.register({
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async(req, res, next)=>{
    try{
        const data = req.body;

        const result = await authService.login(data);
        console.log(result)
        if(!result){
            return res.status(401).json({success:false, ...newUserResult.message});
        }
        
        res.cookie("refreshToken", result.refreshToken, 
          { httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000, 
            path: "/api/auth", });

         res.status(201).json({
            success: true,
            message: "Login successful",
            ...result,
        });
    }
    catch(error){
        if(error.message==="The user is not exist"){
            res.status(404).json({success:false, message:error.message});
        }

        if(error.message==="The user is deactivate"){
            res.status(401).json({success:false, message:error.message});
        }

        if(error.message==="The Password is invalid"){
            res.status(401).json({success:false, message:error.message});

        }

        next(error);
    }
}

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
        session: {
          id: req.session.id,
          createdAt: req.session.createdAt,
          expiresAt: req.session.expiresAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const result =
      await authService.refresh(refreshToken);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth",
    });

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.session.id);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  refresh,
  logout
};