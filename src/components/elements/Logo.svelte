<script lang="ts">
    export let centered = false
    // IMP: Passing in a number and setting size using h-{number}
    // does not work. Due to this, we are passing in the full class
    export let heightClass = 'h-12'
</script>

<img
    class="{heightClass} w-auto {centered ? 'mx-auto' : ''}"
    src="/images/logo.png"
    alt="Infibridge logo" />
