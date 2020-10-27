<template>
    <div class="login-container full-width" @keyup.enter="handleLogin">
        <div class="login-box absolute-horizon-center">
            <h3 class="mb-20 fs-26 font-bold text-center cl-white">
                {{ title }}
            </h3>
            <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form "
                auto-complete="on"
                label-position="left"
            >
                <el-form-item prop="tel">
                    <el-input
                        v-model="loginForm.tel"
                        name="username"
                        type="text"
                        auto-complete="on"
                        class="cl-white"
                    >
                        <img
                            class="left-icon"
                            slot="prefix"
                            src="../../assets/img/userName.png"
                            alt=""
                        />
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                        show-password
                        name="password"
                        v-model="loginForm.password"
                        auto-complete="on"
                        @keyup.enter.native="handleLogin"
                        class="cl-white"
                    >
                        <img
                            class="left-icon"
                            slot="prefix"
                            src="../../assets/img/passWord.png"
                            alt=""
                        />
                    </el-input>
                </el-form-item>

                <el-button
                    :loading="loading"
                    type="primary"
                    class="full-width"
                    @click.native.prevent="handleLogin"
                >
                    {{ !loading ? "登录" : "登录中..." }}
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import { adminLogin } from "@/api/index";
import { mapActions } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                tel: "",
                password: "",
            },
            loading: false,
            loginRules: {
                tel: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入用户名",
                    },
                ],
                password: [
                    { required: true, trigger: "blur", message: "请输入密码" },
                ],
            },
            title: this.$route.meta.title || "",
        };
    },

    methods: {
        ...mapActions(["setUserInfo"]),
        // 用户登录验证
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.login();
                } else {
                    return false;
                }
            });
        },
        // 用户登录
        async login() {
            // let { code, data, message } = await adminLogin(this.loginForm);
            // if (code == 200) {
            this.loading = false;
            localStorage.setItem("admin-token", "aaaa");
            this.setUserInfo({
                username: this.loginForm.account,
            });
            this.$router.push({
                name: "testIndex",
            });
            // } else {
            //     this.loading = false;
            // }
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login-container {
    min-height: 100%;
    background-color: $cl-basic;
    .login-box {
        top: 20%;
        .login-form {
            width: 350px;
            .el-input {
                height: 47px;
                input {
                    background: transparent;
                    border: 0px;
                    -webkit-appearance: none;
                    height: 100%;
                    color: $cl-white;
                    caret-color: $cl-white;
                    &:-webkit-autofill {
                        box-shadow: 0 0 0px 1000px $cl-basic inset !important;
                        -webkit-text-fill-color: $cl-white !important;
                    }
                }
                .el-input__inner {
                    padding-left: 35px;
                    padding-right: 35px;
                }
            }
            .el-form-item {
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                color: #454545;
            }
            .left-icon {
                width: 25px;
                padding: 3px;
                vertical-align: middle;
            }
        }
    }
}
</style>
