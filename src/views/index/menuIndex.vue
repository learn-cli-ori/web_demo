<!-- 导航 -->
<template>
    <div id="home" class="flex" v-loading="globalLoading">
        <div class="left-menu">
            <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router :default-active="$route.path">
                <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.path">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.title}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="(subItem,index) in item.children" :key="index" :index="subItem.path">{{subItem.title}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="content-container flex-1">
            <div class="login-user flex flex-column-center">
                <i class="el-icon-s-unfold mr-10 fz-20"></i>
                <el-breadcrumb separator-class="el-icon-arrow-right" class="flex-1">
                    <el-breadcrumb-item class="fz-18">{{$route.name}}</el-breadcrumb-item>
                </el-breadcrumb>
                <el-image class="avatar" src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=51537235,2449014640&fm=26&gp=0.jpg" fit="fill"></el-image>
                <span class="mr-10 ml-10">测试用户</span>
                <el-button size="small" type="danger" @click="logOut">退出登录</el-button>
            </div>

            <!-- 子路由出口 -->
            <div class="router-box">
                <router-view class="transition-box"></router-view>
            </div>
        </div>
    </div>
</template>


<script>
// 导航列表
import { mapState } from 'vuex';
import { logout } from '@/api/user';
import reConfig from '@/reConfig';
import menuList from './menu';
export default {
    name: 'menuIndex',

    data () {
        return {
            // menuList: this.$store.state.routeInfo || {},
            menuList,
            isCollapse: false,
        };
    },
    created () {
        console.log(this.$route)
    },
    methods: {
        async logOut () {
            logout();
            this.$store.commit('setUserInfo', null);
            this.$store.commit('setRouteInfo', null);
            window.location.href = `${location.origin}/login`
        }
    },

    computed: {
        ...mapState(['globalLoading', 'userInfo'])
    }
};
</script>

<style lang="scss" scoped>
#home {
    .el-menu {
        border-right: 1px solid $basic;
    }
    .el-submenu {
        width: 200px;
    }
    .el-menu--collapse {
        .el-submenu {
            width: auto;
        }
    }
    .is-active .el-submenu__title i {
        color: $warning;
    }
    .el-submenu__title,
    .el-menu-item {
        &:hover i {
            color: $main;
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
        background-color: $basic;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
    .content-container {
        height: 100vh;
        overflow: hidden;
        background-color: $white;

        .login-user {
            border-bottom: 2px solid $gray;
            box-shadow: 1px 1px 2px 2px $gray;
            padding: 20px;
            background-color: $white;
            z-index: 2001;

            .avatar {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
        .breadcrumb {
            box-shadow: 0 0 4px 4px $gray;
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
                background-color: $basic;
            }
        }
    }
}
</style>
