<style scoped>
.layout-footer {
    text-align: right;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
DIV.q-list.page-select {
    font-weight: bold;
    font-size: larger;
}
</style>

<template>
    <q-layout class="full-height" view="hHh LpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="leftDrawerOpen=!leftDrawerOpen" />
                <q-toolbar-title>Heather Anderson</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
            <q-list class="page-select q-pt-md">
                <q-item :clickable="currentPage!='main'" :v-ripple="currentPage!='main'" @click.stop="currentPage='main'">
                    <q-item-section :class="currentPage=='main'?'text-primary':''">Main Page</q-item-section>
                </q-item>
                <q-item :clickable="currentPage!='projects'" :v-ripple="currentPage!='projects'" @click.stop="currentPage='projects'">
                    <q-item-section :class="currentPage=='projects'?'text-primary':''">Projects</q-item-section>
                </q-item>
                <q-item :clickable="currentPage!='interests'" :v-ripple="currentPage!='interests'" @click.stop="currentPage='interests'">
                    <q-item-section :class="currentPage=='interests'?'text-primary':''">Interests</q-item-section>
                </q-item>
                <q-item :clickable="currentPage!='teamwork'" :v-ripple="currentPage!='teamwork'" @click.stop="currentPage='teamwork'">
                    <q-item-section :class="currentPage=='teamwork'?'text-primary':''">TeamWork</q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container class="full-height scroll">
            <project-page v-if="currentPage=='projects'" />
            <interest-page v-else-if="currentPage=='interests'" />
            <teamwork-page v-else-if="currentPage=='teamwork'" />
            <main-page v-else />
        </q-page-container>

        <q-footer bordered class="bg-grey-8 text-white layout-footer">
            Site last updated __UPDATE_TIME__
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, Ref, ref, watch } from 'vue';

function pageChangeSetup() : Ref<string> {
    const currentHash = () : string => {
        let hash = window.location.hash;
        if(hash && hash.substring(0, 1)=='#') hash = hash.substring(1);
        return hash;
    };

    const currentPage = ref(currentHash() || 'main');

    const onPopState = (event:PopStateEvent) : void => {
        currentPage.value = currentHash() || 'main';
    };
    watch(currentPage, (newValue) => {
        if(newValue != (currentHash() || 'main')) {
            window.location.hash = '#'+newValue;
        }
    });

    let isWatched = false;
    onMounted(() => {
        if(!isWatched) {
            window.addEventListener('popstate', onPopState);
            isWatched = true;
        }
    });
    onUnmounted(() => {
        if(isWatched) {
            window.removeEventListener('popstate', onPopState);
            isWatched = false;
        }
    });

    return currentPage;
}

export default defineComponent({
    setup () {
        return {
            leftDrawerOpen: ref(false),
            currentPage: pageChangeSetup(),
        };
    },
});
</script>