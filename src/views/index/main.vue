<!-- 导航 -->
<template>
    <div id="home" class="box">
        <div class="left-menu">
            <el-menu
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
                :default-active="$route.path"
            >
                <el-submenu
                    v-for="(item, index) in menuList"
                    :key="index"
                    :index="item.path"
                >
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                            v-for="(subItem, index) in item.children"
                            :key="index"
                            :index="subItem.path"
                            >{{ subItem.meta.title || "" }}</el-menu-item
                        >
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="content-container box-1">
            <div class="login-user box box-column-center">
                <i class="el-icon-s-unfold mr-10 fz-20"></i>
                <el-breadcrumb
                    separator-class="el-icon-arrow-right"
                    class="box-1"
                >
                    <el-breadcrumb-item class="fz-18">{{
                        $route.meta.title || ""
                    }}</el-breadcrumb-item>
                </el-breadcrumb>
                <el-image
                    class="avatar"
                    src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=51537235,2449014640&fm=26&gp=0.jpg"
                    fit="fill"
                ></el-image>
                <span class="mr-10 ml-10">测试用户</span>
                <el-button size="small" type="primary" @click="showDialog = true"
                    >修改密码</el-button
                >
                <el-button size="small" type="danger" @click="logOut"
                    >退出登录</el-button
                >
            </div>

            <!-- 子路由出口 -->
            <div class="router-box">
                <router-view class="transition-box"></router-view>
            </div>
        </div>

        <el-dialog
            title="修改密码"
            :visible.sync="showDialog"
            v-if="showDialog"
            width="20%"
        >
            <el-form ref="form" label-width="80px">
                <el-form-item label="旧密码">
                    <el-input
                        v-model="passWordInfo.oldPwd"
                        type="password"
                        placeholder="请输入旧密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input
                        type="password"
                        v-model="passWordInfo.pwd1"
                        placeholder="请输入新密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input
                        v-model="passWordInfo.pwd2"
                        type="password"
                        placeholder="请再次输入新密码"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div class="text-center">
                <el-button type="primary" @click="updatePwd" size="small"
                    >确认</el-button
                >
                <el-button @click="showDialog = false" size="small"
                    >取消</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { quitLogin, updatePwd } from "@/api/index";
import reConfig from "@/reConfig";
import menuList from "@/router/menu";
export default {
    name: "menuIndex",
    data() {
        return {
            menuList,
            showDialog: false,
            isCollapse: false,
            passWordInfo: {
                oldPwd: "",
                pwd1: "",
                pwd2: "",
            },
        };
    },

    methods: {
        ...mapActions(["setUserInfo"]),
        
        async logOut() {
            // let { code, data } = await quitLogin();
            // if (code == 200) {
            //     this.setUserInfo(null);
            //     this.$router.replace({
            //         name:'login'
            //     })
            // }
            this.setUserInfo(null);
            this.$router.replace({
                name: "login",
            });
        },

        async updatePwd() {
            let { oldPwd, pwd1, pwd2 } = this.passWordInfo;
            if (!oldPwd) {
                return this.$message.error("请输入旧密码");
            }
            if (!pwd1) {
                return this.$message.error("请输入新密码");
            }
            if (!pwd2) {
                return this.$message.error("请输入确认密码");
            }

            if (pwd1 != pwd2) {
                return this.$message.error("两次密码不一致");
            }
            // let { code, data, message } = await updatePwd({ pwd:pwd1, oldPwd });
            // if (code == 200) {
            //     this.showDialog = false;
            //     this.$message.success("修改成功，请重新登录");
            //     this.setUserInfo(null);
            //     setTimeout(() => {
            //       this.$router.replace({
            //         name:'login'
            //     })
            //     }, 500);
            // }
            this.showDialog = false;
        },
    },

    computed: {
        ...mapState(["userInfo"]),
    },
};
</script>

<style lang="scss" scoped>
#home {
    .el-menu {
        border-right: 1px solid #545c64;
    }
    .el-submenu {
        width: 200px;
    }
    .el-menu--collapse {
        .el-submenu {
            width: auto;
        }
    }
    .el-menu-item [class^="el-icon-"],
    .el-submenu__title [class^="el-icon-"] {
        margin-right: 15px;
        font-size: 22px;
    }

    .left-menu {
        height: 100vh;
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: #545c64;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
    .content-container {
        height: 100vh;
        overflow: hidden;
        background-color: #ffffff;

        .login-user {
            border-bottom: 2px solid #f8f8f8;
            box-shadow: 1px 1px 2px 2px #f8f8f8;
            padding: 20px;
            background-color: #ffffff;
            z-index: 2001;

            .avatar {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
        .breadcrumb {
            box-shadow: 0 0 4px 4px #f8f8f8;
        }
        .router-box {
            height: calc(100vh - 65px);
            padding: 30px 20px;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                width: 5px;
                height: 5px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: #545c64;
            }
        }
    }
}
</style>
