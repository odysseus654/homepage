<style scoped>
    .layout-footer {
    text-align: right;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

<template>
    <q-layout view="hHh LpR fFf">

        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-toolbar-title>Heather Anderson</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above side="left" bordered>
            <!-- drawer content -->
        </q-drawer>

        <q-page-container>
            <main-page />
        </q-page-container>

        <q-footer bordered class="bg-grey-8 text-white layout-footer">
            Site last updated __UPDATE_TIME__
        </q-footer>
    </q-layout>
</template>
