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
DIV.q-tab {
    justify-content: flex-start;
}
DIV.q-tab :deep(DIV.q-tab__label) {
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
            <q-list class="col-auto page-select q-pt-md q-pb-sm non-selectable">
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
                    <q-item-section :class="currentPage=='teamwork'?'text-primary':''">Work Experience</q-item-section>
                </q-item>
            </q-list>
            <q-tabs v-if="currentPage!='main'" v-model="currentTab" class="q-px-sm col-auto q-pt-sm border-default" no-caps vertical switch-indicator
                indicator-color="primary" :style="{'border-top':'1px solid black'}">
                <template v-if="currentPage=='projects'">
                    <q-tab label="node-win32ole" name="projects-win32ole" />
                    <q-tab label="athenamesh" name="projects-athenamesh" />
                    <q-tab label="SuperMake" name="projects-supermake" />
                    <q-tab label="pydsn" name="projects-pydsn" />
                    <q-tab label="mod-hpsdr" name="projects-hpsdr" />
                    <q-tab label="amtest" name="projects-amtest" />
                    <q-tab label="AutoSlate Extractor" name="projects-autoslate" />
                    <q-tab label="Evochron Workaround" name="projects-evochron" />
                    <q-tab label="EC2 Service Console" name="projects-ec2servconsole" />
                    <q-tab label="Second Life Events Board" name="projects-events" />
                </template>
                <template v-else-if="currentPage=='interests'">
                    <q-tab label="Star Citizen" name="interests-sc" />
                    <q-tab label="Vircadia" name="interests-vircadia" />
                    <q-tab label="Elite: Dangerous" name="interests-ed" />
                    <q-tab label="InWorldz" name="interests-iw" />
                    <q-tab label="Amateur Radio" name="interests-ham" />
                    <q-tab label="Second Life" name="interests-sl" />
                    <q-tab label="Cyan Worlds" name="interests-cyan" />
                </template>
                <template v-else-if="currentPage=='teamwork'">
                    <q-tab label="The Beginning" name="teamwork-begin" />
                    <q-tab label="Core Rewrite" name="teamwork-ng" />
                    <q-tab label="Moving to the Internet" name="teamwork-ie" />
                    <q-tab label="Hosted Service" name="teamwork-red" />
                    <q-tab label="Amazon Web Services" name="teamwork-aws" />
                    <q-tab label="The Next Version" name="teamwork-tulsa" />
                </template>
            </q-tabs>
            <div class="col" />
            <div class="col-auto q-pa-md">
                <span v-if="isDark" class="cursor-pointer" @click="toggleDark()">[Light Mode]</span>
                <span v-else class="cursor-pointer" @click="toggleDark()">[Dark Mode]</span>
            </div>
        </q-drawer>

        <q-page-container class="full-height no-scroll">
            <q-page class="full-height scroll" :style="{'scroll-behavior':'smooth'}">
                <q-scroll-observer @scroll="onScroll($event,vm)" />
                <project-page v-if="currentPage=='projects'" ref="page" />
                <interest-page v-else-if="currentPage=='interests'" ref="page" />
                <teamwork-page v-else-if="currentPage=='teamwork'" ref="page" />
                <main-page v-else ref="page" />
            </q-page>
        </q-page-container>

        <q-footer bordered class="bg-back-shade-60 layout-footer">
            Site last updated {{ updateTime.toString() }}
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import { ComponentPublicInstance, computed, defineComponent, getCurrentInstance, onMounted, onUnmounted, Ref, ref, toRef, watch } from 'vue';
declare var __UPDATE_TIME__ : number;

interface ScrollObserverData {
    position: { top: number, left: number },
    direction: 'up'|'down'|'left'|'right',
    directionChanged: boolean,
    delta: { top: number, left: number },
    inflectionPoint: { top: number, left: number }
}

function pageChangeSetup() : {currentPage:Ref<string>,currentSection:Ref<string>} {
    const currentHash = () : {page:string,section?:string} => {
        let hash = window.location.hash;
        if(hash && hash.substring(0, 1)=='#') hash = hash.substring(1);
        if(!hash) return {page:'main'};
        const dashPos = hash.indexOf('-');
        if(dashPos >= 0) {
            return {
                page: hash.substring(0, dashPos),
                section: hash,
            };
        } else {
            return {
                page: hash,
                section: hash,
            };
        }
    };

    const hash = currentHash();
    const currentPage = ref(hash.page);
    const currentSection = ref(hash.section || '');

    const onPopState = (event:PopStateEvent) : void => {
        const hash = currentHash();
        currentPage.value = hash.page;
        currentSection.value = hash.section || '';
    };
    watch(currentPage, (newValue) => {
        if(newValue != currentHash().page) {
            window.location.hash = '#'+newValue;
        }
    });
    watch(currentSection, (newValue) => {
        if(!newValue) {
            window.location.hash = '#'+currentPage.value;
        }
        else if(newValue != currentHash().section) {
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

    return { currentPage, currentSection };
}

export default defineComponent({
    props: {
        useQuasar: { type:Function, required:true },
    },
    setup (props) {
        const quasar = props.useQuasar();
        const updateTime = new Date(__UPDATE_TIME__);
        const pageVals = pageChangeSetup();
        
        return {
            leftDrawerOpen: ref(false),
            currentPage: pageVals.currentPage,
            currentTab: pageVals.currentSection,
            isDark: computed<boolean>(() => quasar.dark.isActive ),
            toggleDark: () => { quasar.dark.toggle(); },
            updateTime: updateTime,
        };
    },
    
    methods: {
        onScroll(this:ComponentPublicInstance, data:ScrollObserverData) {
/*            const page = this.$refs.page as ComponentPublicInstance;
            const position = data.position.top;

            let id = '';
            let dist = 0;
            const sections = page.$refs as Record<string, ComponentPublicInstance>;
            for(const key in sections) {
                const section = sections[key];
                if(!section) continue;

                const el = section.$el as HTMLDivElement|undefined;
                if(!el || !el.id) continue;

                const offsetTop = el.offsetTop;
                const offsetBot = offsetTop + el.offsetHeight;
                if(offsetTop <= position+10 && offsetBot > position && (!id || offsetTop < dist)) {
                    dist = offsetTop;
                    id = el.id;
                }
            }
            (this as any).currentTab = id;*/
        },
    },
});
</script>