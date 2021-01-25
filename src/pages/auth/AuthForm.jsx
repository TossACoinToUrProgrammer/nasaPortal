import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import css from "./AuthPage.module.scss";

import { register, login } from "../../redux/reducers/authReducer";

const AuthForm = ({ register, login, error }) => {
  const [emailInput, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const clear = () => {
    setEmail("");
    setPwd("");
  };
  const registerHandler = () => {
    register(emailInput, pwd);
    clear();
  };
  const loginHandler = () => {
    login(emailInput, pwd);
    clear();
  };
  useEffect(() => {
    if (error && window.M) {
      window.M.toast({ html: error });
    }
  }, [error]);
  return (
    <>
      <h2>Authorization</h2>
      <div className={css.formWrapper}>
        <div>
          <div className="input-field auth__input">
            <input
              id="email"
              type="text"
              className="validate"
              name="email"
              value={emailInput}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field auth__input">
            <input
              id="password"
              type="password"
              className="validate"
              name="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn yellow darken-4"
            style={{ marginRight: "10px" }}
            onClick={loginHandler}
          >
            Sign In
          </button>
          <button
            onClick={registerHandler}
            className="btn grey lighten-1 black-text"
          >
            Register
          </button>
        </div>

        <div className={css.separate}>
          <div className={css.line}></div>
          <span> or </span>
        </div>
        <div className={css.linksWrapper}>
          <a
            href="http://localhost:5000/api/auth/google"
            className={css.link}
            style={{ backgroundColor: "#b81717" }}
          >
            <img
              src="data:image/png;base64,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"
              alt="logo"
              className={css.link_logo}
            />
            <span>Sign In with Google</span>
          </a>
          <a
            href="http://localhost:5000/api/auth/google"
            className={css.link}
            style={{ backgroundColor: "#205fa2" }}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAHFklEQVR42u3dPW8dWRnA8Tkz4+uXxM4LhETKarWgCFEkEmKbLbKrCAElLxECCkooCMV+Axo+ABWioKRCYgUFNGxBibQgEFKKBJPQJDZxbIKSONc38cxQrFCQECAnN3PuM/P7fYIn8f37nHvn3ONUMFo3b95cO3/+/CeqqrpQluXrZVmeL4riXErpo13XfSyltJFS2ui6bq3ruuNlWZYppSKllHv0/yot8nCvQJ17APqxs7NzbmNj462yLN9MKX06pXQxpfRGWZa5R+MlCHig7t27d/LEiRNfqKrq8ymlK2VZXhjZ4jQKAh6Q3d3d0+vr61fLsvx6VVVXUkp+vgPnBzwA+/v7VyaTyXfKsvxyWZaT3PPQH2+Agrp+/Xp9cHDwjcPDwz+tra39pq7rr4l3fKzAAU2n068uLS19v6qqT+WehbwEHMj+/v7FyWTyw7qu38k9C4vBFjqAu3fv1rPZ7Hurq6t/FC//zgq84B49evT66urqT6uqeiv3LCweAS+w6XR6ZTKZvFeW5encs7CYbKEX1MHBwTeXl5ffFy//i4AX0HQ6vTaZTH7iIAb/j7N1C2Y2m31raWnpx449vpixfZlhVP/YRTedTr+4vLz885SSndELEjBZPH78+OLa2tpvU0rHc88S2dgC9pt+Aezt7R1fXV19T7wclYAXwPr6+g/Ksvxk7jmIZ1TbjUX05MmTz62srLw/sp3fK2MLTW/u3LmzMplMfjSy1xxzJOCMzpw5c62qqgu55yAuv/oz2d3d3Th16tRfnbSaL1toerG+vn5NvLwsAWewtbU1qev63dxzEJ+AMzh9+vTVsizP5Z6D+AScQVVV3849A8Mg4J49ePDgtaqqPpt7DoZBwD1bW1u7OrIPSnmFBNyzqqq+lHsGhkPAPdre3j5elqVL6ZgbAffo5MmT77hlg3kScI/qun479wwMi4B7lFJyNSxzJeB+fSb3AAyLgHuys7PzRlVVG7nnYFgE3JONjQ03bjB3Au6PgJk7AfekqqqP556B4RFwf17LPQDDI+D++PogcyfgnqSU3L7B3Am4PwJm7gTcH8+AmTsB98efTWHuBNyTsvRfzfx5VfXELRy8CgKGwAQMgQkYAhMwBOZ+Jl5K13VF27YftG37q6Zp/vDs2bO/3L9//x/b29sPL1++/CT3fEMnYF5Y0zQfzGaz7x47duz3uWcZK1toXsjh4eHPtra23hZvXh5O9qTrui73DPPSNM2Nvb29N8+ePWuLnJmAezKkgGez2VdWVlZ+kXsObKE5orZtdzY3N3+Zew4+JGCOpG3bX1+6dOkw9xx8SMAcSdu2v8s9A88JmCNp2/bPuWfgOQFzJE+fPt3KPQPPCZgj6bpuN/cMPCdgjuT27dtPc8/AcwLmSB4+fPg49ww85yBHT4ZykCO5WmShWIEhMAFDYAKGwAQMgQkYAhMwBCZgCEzAEJiAITABQ2AChsAEDIEJGAITMAQmYAhMwBDY6L6cPZQv1vOfmqZp67qucs/RJyswQ/K33AP0TcAMyU7uAfomYIbECgxRdV1nBYbABAxRdV23nXuGvgmYwWjb1goMUQkYAjs8PBQwRLW/v+8xEkTUtm1x48aN0a3AzkIzCE3T7NR1fTb3HH2zAjMUo9s+F4WAGY7RbZ+LQsAMxBiPURaFgBkOAUNUYzxGWRQCZiDGeAqrKATMQHgPDIE1TeMxEkR1cHBgBYaI2rYtNjc3R7kCO0pJeE3T/L2u64/kniMHKzBDMMrVtygEzDCM8v1vUQiYARjrI6SiEDADIGCIbZTHKItCwAyAFRgC67rOp9AQVdM0VmCIajabWYEhoq7rilu3bo12BXaUktCapnlY1/WJ3HPkYgUmutFun4tCwMQ32u1zUQiY4Mb8DLgoBEx8Aoaoxnob5b+M7lPoXIby6XdKyWtmgViBITABQ2AChsAEDIEJGAITMAQmYAhMwBCYgCEwAUNgAobABAyBCRgCEzAEJmAITMAQmIAhMAFDYAKGwAQMgQkYAhMwBCZgCEzAEJiAITABQ2AChsAEDIEJGAITMAQmYAhMwBCYgCEwAUNgAobABAyBCRgCEzAEJmAITMAQmIAhMAFDYAKGwAQMgQkYAhMwBCZgCEzAEJiAITABQ2AChsAEDIEJGAITMAQmYAhMwBCYgCEwAUNgAobABAyBCRgCEzAEJmAITMAQmIAhMAFDYAKGwAQMgQkYAhMwBCZgCEzAEJiAITABQ2AChsAEDIEJGAITMAQmYAhMwBCYgCEwAUNgAobABAyBCRgCEzAEJmAITMAQmIAhMAFDYAKGwAQMgQkYAhMwBCZgCEzAEJiAITABQ2AChsAEDIEJGAITMAQmYAhMwBCYgCEwAUNgAobABAyBCRgCEzAEJmAITMAQmIAhMAFDYAKGwAQMgQkYAhMwBCZgCOyf5HRtg3roCGEAAAAASUVORK5CYII="
              alt="logo"
              className={css.link_logo}
            />
            <span>Sign In with Facebook</span>
          </a>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, { register, login })(AuthForm);
