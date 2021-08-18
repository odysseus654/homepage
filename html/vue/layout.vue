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
        <q-header elevated class="bg-primary">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="leftDrawerOpen=!leftDrawerOpen" />
                <q-toolbar-title>Heather Anderson</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="column no-wrap justify-start items-stretch">
            <q-list class="col page-select q-pt-md non-selectable">
                <q-item :clickable="currentPage!='main'" v-ripple @click.stop="currentPage='main'">
                    <q-item-section :class="currentPage=='main'?'text-primary':''">Main Page</q-item-section>
                </q-item>
                <q-item :clickable="currentPage!='projects'" v-ripple @click.stop="currentPage='projects'">
                    <q-item-section :class="currentPage=='projects'?'text-primary':''">Projects</q-item-section>
                </q-item>
                <q-item :clickable="currentPage!='interests'" v-ripple @click.stop="currentPage='interests'">
                    <q-item-section :class="currentPage=='interests'?'text-primary':''">Interests</q-item-section>
                </q-item>
                <q-item :clickable="currentPage!='teamwork'" v-ripple @click.stop="currentPage='teamwork'">
                    <q-item-section :class="currentPage=='teamwork'?'text-primary':''">TeamWork</q-item-section>
                </q-item>
            </q-list>
            <div class="col-auto q-pa-md">
                <span v-if="isDark" class="cursor-pointer" @click="toggleDark()">[Light Mode]</span>
                <span v-else class="cursor-pointer" @click="toggleDark()">[Dark Mode]</span>
            </div>
        </q-drawer>

        <q-page-container class="full-height scroll">
            <project-page v-if="currentPage=='projects'" />
            <interest-page v-else-if="currentPage=='interests'" />
            <teamwork-page v-else-if="currentPage=='teamwork'" />
            <main-page v-else />
        </q-page-container>

        <q-footer bordered class="bg-back-shade-60 layout-footer">
            Site last updated __UPDATE_TIME__
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, Ref, ref, toRef, watch } from 'vue';

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
    props: {
        useQuasar: { type:Function, required:true },
    },
    setup (props) {
        const quasar = props.useQuasar();

        return {
            leftDrawerOpen: ref(false),
            currentPage: pageChangeSetup(),
            isDark: computed<boolean>(() => quasar.dark.isActive ),
            toggleDark: () => { quasar.dark.toggle(); },
        };
    },
});
</script>