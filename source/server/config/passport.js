const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const models = require(path.join(__dirname, '../models'));
const bcrypt = require('bcrypt-nodejs');

module.exports = () => {
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use(new LocalStrategy({ // local 전략을 세움
    usernameField: 'id',
    passwordField: 'password',
    session: true, // 세션에 저장 여부
    passReqToCallback: true,
  }, (req, id, password, done) => {
    models.user.findOne({
      where: { id },
    }).then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) return done(null, false, { err: true, msg: '아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.' }); // 임의 에러 처리
      user = user.get({ plain: true });
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      return done(null, user);
    }).catch((e) => {
      done(e); // 서버 에러 처리
    });
  }));
};
