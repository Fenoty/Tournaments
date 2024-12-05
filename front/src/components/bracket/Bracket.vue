<template>
    <div class="vtb-wrapper" v-if="recursiveBracket">
        <bracket-node
            :bracket-node="recursiveBracket"
            @onSelectedPlayer="highlightPlayer"
            @onDeselectedPlayer="unhighlightPlayer"
            :highlighted-player-id="highlightedPlayerId"
        >
            <template #player="{ player }">
                <slot name="player" :player="player" />
            </template>
            <template #player-extension-bottom="{ match }">
                <slot name="player-extension-bottom" :match="match" />
            </template>
        </bracket-node>
    </div>
</template>

<script lang="ts">
    import BracketNode from "@components/bracket/BracketNode.vue";
    import recursiveBracket from "./recursiveBracket";

    export default {
        name: "bracket",
        components: {
            "bracket-node": BracketNode,
        },
        props: ["rounds", "flatTree"],
        data() {
            return {
                highlightedPlayerId: null,
            };
        },
        computed: {
            recursiveBracket() {
                // if (this.flatTree) {
                //     return recursiveBracket.transformFlatTree(this.flatTree);
                // }

                return recursiveBracket.transform(this.rounds);
            },
        },
        methods: {
            highlightPlayer(id: any) {
                this.highlightedPlayerId = id;
            },
            unhighlightPlayer() {
                this.highlightedPlayerId = null;
            },
        },
    };
</script>

<style>
    .vtb-wrapper {
        display: flex;
    }
</style>