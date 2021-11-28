const passport =require('passport');
const LocalSrategy = require('passport-local').Strategy;

const User=require('../models/user');

passport.serializeUser((user, done)=>{
  done(null,user.id);
});

passport.deserializeUser( async(id, done)=>{
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup',new LocalSrategy({
  usernameField : 'userName',
  passportField : 'passport',
  passReqToCallback : true
}, async(req,userName,passport,done)=>{
  const user = new User();
  user.userName = userName;
  user.passport = passport;
  await user.save();
  done(null, user);
}));