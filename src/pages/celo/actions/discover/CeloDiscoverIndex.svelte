<script lang="ts">
    import { _ } from 'svelte-i18n'
    import EmptyLayout from '../../../../layouts/EmptyLayout.svelte'

</script>

<EmptyLayout>
    <div>
        <div class="relative bg-gray-800">
            <nav>
                <div class="max-w-3xl mx-auto px-2">
                    <div
                        class="relative flex items-center justify-between"
                        style="height: 55px;">
                        <div class="px-2 flex items-center">
                            <div class="flex-shrink-0">
                                <img
                                    class="block h-10 w-auto"
                                    src="/images/icon-48x48.png"
                                    alt="Infibridge logo" />
                            </div>
                        </div>
                        <div class="block ml-4">
                            <div class="flex">
                                <span class="text-sm font-medium text-white">
                                    {$_('Discover').toLocaleUpperCase()}
                                </span>
                            </div>
                        </div>
                        <div class="flex-1 px-2 flex ml-6 justify-end">
                            <div class="w-full max-w-xs">
                                <label for="search" class="sr-only"
                                    >Search</label>
                                <div
                                    class="relative text-light-blue-100 focus-within:text-gray-400">
                                    <div
                                        class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <svg
                                            class="flex-shrink-0 h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true">
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        class="block w-full py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:outline-none focus:bg-white focus:ring-white focus:border-white focus:placeholder-gray-500 focus:text-gray-900 text-sm"
                                        placeholder={$_('SearchProjects')}
                                        type="search" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

        <div class="mx-auto w-full">
            <ul class="py-4 px-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <li
                    class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                    <div class="flex-1 flex flex-col p-4">
                        <img
                            class="w-32 h-32 flex-shrink-0 mx-auto"
                            alt="moola"
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNzkgMzIiIHdpZHRoPSI3OSIgaGVpZ2h0PSIzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNNzMuNzYzOCAxMS4wNzQxVjEzLjExNDRDNzEuODkyNCAxMS41NzY4IDY5LjQ4NyAxMC42NTUyIDY2Ljg2MiAxMC42NTUyQzYyLjEyNjEgMTAuNjU1MiA1OC4xMDM4IDEzLjY2MTUgNTYuNjQ2NiAxNy44NTA2VjBINTEuNTg2M1YxOC4zNjMyQzUxLjA4NzIgMTQuMTg4OCA0Ny40OTQxIDEwLjk1MDkgNDMuMTMyNCAxMC45NTA5QzM5LjkzMzYgMTAuOTUwOSAzNy4xNDg5IDEyLjY5MDYgMzUuNjk2NyAxNS4yNjMyQzM1LjY4NjcgMTUuMjYzMiAzNS42NzY3IDE1LjI2ODEgMzUuNjcxNyAxNS4yNjgxQzM1LjYwMTkgMTUuMjc4IDM1LjUzMiAxNS4yODc4IDM1LjQ2MjEgMTUuMjk3N0MzNS40NDIyIDE1LjMwMjYgMzUuNDIyMiAxNS4zMDI2IDM1LjQwNzIgMTUuMzA3NkMzNS4yMzI2IDE1LjMzNzEgMzUuMDU3OSAxNS4zNzE2IDM0Ljg4ODIgMTUuNDExMUMzNC44NzMyIDE1LjQxNiAzNC44NTgzIDE1LjQyMDkgMzQuODQzMyAxNS40MjA5QzM0Ljc2ODUgMTUuNDQwNiAzNC42OTM2IDE1LjQ2MDMgMzQuNjE4NyAxNS40ODAxQzM0LjYwODggMTUuNDg1IDM0LjU5ODggMTUuNDg1IDM0LjU4ODggMTUuNDg5OUMzNC40MTQxIDE1LjUzOTIgMzQuMjQ0NSAxNS41ODg1IDM0LjA3NDggMTUuNjQ3NkMzNC4wNjQ4IDE1LjY1MjUgMzQuMDU5OCAxNS42NTI1IDM0LjA0OTggMTUuNjU3NUMzMy45NyAxNS42ODcgMzMuODg1MSAxNS43MTY2IDMzLjgwNTMgMTUuNzQ2MkgzMy44MDAzQzMzLjYzMDYgMTUuODEwMyAzMy40NjEgMTUuODg0MiAzMy4yOTEzIDE1Ljk1ODFDMzMuMjkxMyAxNS45NTgxIDMzLjI4NjMgMTUuOTU4MSAzMy4yODYzIDE1Ljk2M0MzMC43NTYxIDE3LjEyNjEgMjguODk5NyAxOS40ODE5IDI4LjQ1NTUgMjIuMzAwOVYyMC4wMjRDMjguNDU1NSAxNS43NjEgMjcuNzE2OSAxMS4wNTkzIDIxLjM3OTEgMTEuMDU5M0MxOS4yMzMyIDExLjA1OTMgMTguMDMwNSAxMS42MzEgMTYuNzY3OSAxMi41NTI2QzE2LjIxOSAxMi45NDY5IDE1LjczNDkgMTMuNDc0MiAxNS4yODU3IDE0LjA5MDNDMTQuMTM3OSAxMi4xMzg2IDEyLjI2NjUgMTEuMDI0OCA5LjY5MTQ1IDExLjAyNDhDNy44NzQ5MyAxMS4wMjQ4IDYuNDcyNjEgMTEuNTU3MSA0Ljc3NTg2IDEzLjQ4NDFWMTEuNjIxMUgwVjMxLjk2NTVINC43NzU4NlYyMC42ODk0QzQuODkwNjQgMTcuMDY3IDYuMTY4MTkgMTUuMzE3NCA4LjQ0ODgzIDE1LjMwMjZDMTEuMDU4OCAxNS4yODI5IDExLjgwNzQgMTcuNDg1OSAxMS44MDc0IDIwLjQ4NzNWMzEuOTk1MUgxNi42MjMyVjIxLjM0OThDMTYuODEyOCAxNi43MTcxIDE4LjA4MDQgMTUuMzAyNiAyMC4yNzYyIDE1LjMwMjZDMjMuMjcwNSAxNS4zMDI2IDIzLjYzNDggMTcuNDg1OSAyMy42MzQ4IDIwLjQ4NzNWMzEuOTk1MUgyOC40NTA1VjI0Ljg4MzRDMjkuMDc5MyAyOC45MTQ4IDMyLjYwNzYgMzIgMzYuODY0NCAzMkM0MC4wNjMzIDMyIDQyLjg0OCAzMC4yNjAzIDQ0LjMwMDIgMjcuNjg3N0M0NC4zMTAyIDI3LjY4NzcgNDQuMzE1MiAyNy42ODc3IDQ0LjMyNTIgMjcuNjgyN0M0NC4zOTUgMjcuNjcyOSA0NC40NjQ5IDI3LjY2MyA0NC41MzQ4IDI3LjY1MzJDNDQuNTU0NyAyNy42NDgyIDQ0LjU3NDcgMjcuNjQ4MiA0NC41ODk3IDI3LjY0MzNDNDQuNzY0MyAyNy42MTM3IDQ0LjkzOSAyNy41NzkyIDQ1LjEwODcgMjcuNTM5OEM0NS4xMjM2IDI3LjUzNDkgNDUuMTM4NiAyNy41MyA0NS4xNTM2IDI3LjUzQzQ1LjIyODQgMjcuNTEwMiA0NS4zMDMzIDI3LjQ5MDUgNDUuMzc4MSAyNy40NzA4QzQ1LjM4ODEgMjcuNDY1OSA0NS4zOTgxIDI3LjQ2NTkgNDUuNDA4MSAyNy40NjFDNDUuNTgyOCAyNy40MTE3IDQ1Ljc1MjQgMjcuMzYyNCA0NS45MjIxIDI3LjMwMzJDNDUuOTMyMSAyNy4yOTgzIDQ1LjkzNzEgMjcuMjk4MyA0NS45NDcxIDI3LjI5MzRDNDYuMDI2OSAyNy4yNjM4IDQ2LjExMTcgMjcuMjM0MyA0Ni4xOTE2IDI3LjIwNDdINDYuMTk2NkM0Ni4zNjYzIDI3LjE0MDYgNDYuNTM1OSAyNy4wNjY3IDQ2LjcwNTYgMjYuOTkyOEM0Ni43MDU2IDI2Ljk5MjggNDYuNzEwNiAyNi45OTI4IDQ2LjcxMDYgMjYuOTg3OEM0Ni45NjAxIDI2Ljg3NDUgNDcuMjA0NiAyNi43NDYzIDQ3LjQzOTIgMjYuNjA4M0M0OS42Nzk5IDI1LjMwNzMgNTEuMjYxOSAyMy4wMjA1IDUxLjU3NjMgMjAuMzQ5M1YzMS45OTUxSDU2LjYzNjZWMjQuNzk5NkM1OC4wOTM4IDI4Ljk4ODggNjIuMTIxMSAzMS45OTUxIDY2Ljg1MiAzMS45OTUxQzY5LjQ3NyAzMS45OTUxIDcxLjg4MjQgMzEuMDczNSA3My43NTM4IDI5LjUzNThWMzEuOTg1Mkg3OC43NjkyVjExLjA3NDFINzMuNzYzOFpNMzkuNjM0MSAxOS40MDNDMzkuNjQ0MSAxOS40MDggMzkuNjQ5MSAxOS40MTI5IDM5LjY1OTEgMTkuNDE3OEMzOS42OTkgMTkuNDQyNSAzOS43MzM5IDE5LjQ2NzEgMzkuNzY4OSAxOS40OTE4QzM5Ljc3MzkgMTkuNDk2NyAzOS43NzM5IDE5LjQ5NjcgMzkuNzc4OSAxOS40OTY3QzM5Ljg2MzcgMTkuNTU1OCAzOS45NDM1IDE5LjYxNSA0MC4wMjM0IDE5LjY3OUM0MC4wMjg0IDE5LjY4NCA0MC4wMzg0IDE5LjY4ODkgNDAuMDQzNCAxOS42OTM4QzQwLjA3ODMgMTkuNzIzNCA0MC4xMTMyIDE5Ljc0OCA0MC4xNDgyIDE5Ljc3NzZDNDAuMTUzMSAxOS43ODI1IDQwLjE1ODEgMTkuNzgyNSA0MC4xNTgxIDE5Ljc4NzVDNDAuMjM4IDE5Ljg1MTUgNDAuMzEyOCAxOS45MjA1IDQwLjM4MjcgMTkuOTg5NUM0MC4zODc3IDE5Ljk5NDUgNDAuMzkyNyAxOS45OTk0IDQwLjM5MjcgMTkuOTk5NEM0MC40Mjc2IDIwLjAyOSA0MC40NTc2IDIwLjA2MzUgNDAuNDkyNSAyMC4wOTc5QzQwLjQ5NzUgMjAuMTAyOSA0MC41MDI1IDIwLjEwNzggNDAuNTAyNSAyMC4xMDc4QzQwLjU3MjMgMjAuMTgxNyA0MC42NDIyIDIwLjI1NTcgNDAuNzEyMSAyMC4zMzQ1TDQwLjcxNzEgMjAuMzM5NEM0MC43NDcgMjAuMzczOSA0MC43NzcgMjAuNDEzNCA0MC44MDY5IDIwLjQ0NzlDNDAuODExOSAyMC40NTI4IDQwLjgxMTkgMjAuNDU3NyA0MC44MTY5IDIwLjQ2MjdDNDAuOTExNyAyMC41ODA5IDQxLjAwMTUgMjAuNzA0MSA0MS4wOTE0IDIwLjgzMjNDNDEuMDk2MyAyMC44MzcyIDQxLjA5NjMgMjAuODQyMSA0MS4xMDEzIDIwLjg0NzFDNDEuMTMxMyAyMC44ODY1IDQxLjE1NjIgMjAuOTMwOCA0MS4xODEyIDIwLjk3NTJDNDEuNjU1MyAyMS43MzQyIDQxLjkyOTcgMjIuNjMxMSA0MS45Mjk3IDIzLjU5MjJDNDEuOTI5NyAyMy43OTkyIDQxLjkxNDggMjQuMDA2MiA0MS44ODk4IDI0LjIwODJDNDEuODY5OSAyNC4yMDMzIDQxLjg0OTkgMjQuMTk4NCA0MS44Mjk5IDI0LjE5MzRDNDEuODE1IDI0LjE4ODUgNDEuOCAyNC4xODM2IDQxLjc4NSAyNC4xODM2QzQxLjc1MDEgMjQuMTczNyA0MS43MTAyIDI0LjE2MzkgNDEuNjc1MiAyNC4xNTRDNDEuNjY1MiAyNC4xNDkxIDQxLjY1MDMgMjQuMTQ5MSA0MS42NDAzIDI0LjE0NDJDNDEuNTkwNCAyNC4xMjk0IDQxLjU0NTUgMjQuMTE0NiA0MS40OTU2IDI0LjA5OThDNDEuNDkwNiAyNC4wOTk4IDQxLjQ5MDYgMjQuMDk5OCA0MS40ODU2IDI0LjA5NDlDNDEuNDQwNyAyNC4wODAxIDQxLjM5NTggMjQuMDY1MyA0MS4zNTU4IDI0LjA1MDVDNDEuMzQ1OSAyNC4wNDU2IDQxLjMzMDkgMjQuMDQwNyA0MS4zMjA5IDI0LjAzNTdDNDEuMjg2IDI0LjAyMDkgNDEuMjUxIDI0LjAwNjIgNDEuMjE2MSAyMy45OTYzQzQxLjIwNjEgMjMuOTkxNCA0MS4xOTYxIDIzLjk4NjQgNDEuMTgxMiAyMy45ODE1QzQxLjA5MTQgMjMuOTQyMSA0MC45OTY1IDIzLjkwMjcgNDAuOTExNyAyMy44NTgzQzQwLjkwMTcgMjMuODUzNCA0MC44OTE3IDIzLjg0ODUgNDAuODg2NyAyMy44NDM1QzQwLjg1MTggMjMuODIzOCA0MC44MTY5IDIzLjgwOSA0MC43NzcgMjMuNzg5M0M0MC43NjcgMjMuNzg0NCA0MC43NTcgMjMuNzc5NSA0MC43NDcgMjMuNzc0NUM0MC43MDcxIDIzLjc1NDggNDAuNjYyMiAyMy43MzAyIDQwLjYyMjIgMjMuNzA1NUM0MC42MjIyIDIzLjcwNTUgNDAuNjE3MyAyMy43MDU1IDQwLjYxNzMgMjMuNzAwNkM0MC41NzIzIDIzLjY3NiA0MC41Mjc0IDIzLjY1MTMgNDAuNDg3NSAyMy42MjE3QzQwLjQ4MjUgMjMuNjE2OCA0MC40Nzc1IDIzLjYxNjggNDAuNDcyNSAyMy42MTE5QzQwLjQzNzYgMjMuNTg3MiA0MC4zOTc3IDIzLjU2NzUgNDAuMzYyNyAyMy41NDI5QzQwLjM1MjggMjMuNTM4IDQwLjM0NzggMjMuNTMzIDQwLjMzNzggMjMuNTI4MUM0MC4yOTc5IDIzLjUwMzUgNDAuMjYyOSAyMy40Nzg4IDQwLjIyOCAyMy40NTQyQzQwLjIyMyAyMy40NTQyIDQwLjIyMyAyMy40NDkzIDQwLjIxOCAyMy40NDkzQzQwLjEzMzIgMjMuMzkwMSA0MC4wNTMzIDIzLjMzMSAzOS45NzM1IDIzLjI2NjlDMzkuOTY4NSAyMy4yNjIgMzkuOTYzNSAyMy4yNTcgMzkuOTUzNSAyMy4yNTIxQzM5LjkxODYgMjMuMjIyNSAzOS44ODM3IDIzLjE5NzkgMzkuODQ4NyAyMy4xNjgzQzM5Ljg0MzcgMjMuMTYzNCAzOS44Mzg3IDIzLjE2MzQgMzkuODM4NyAyMy4xNTg1QzM5Ljc1ODkgMjMuMDk0NCAzOS42ODQgMjMuMDI1NCAzOS42MTQyIDIyLjk1NjRDMzkuNjA5MiAyMi45NTE1IDM5LjYwNDIgMjIuOTQ2NiAzOS42MDQyIDIyLjk0NjZDMzkuNTY5MyAyMi45MTcgMzkuNTM5MyAyMi44ODI1IDM5LjUwNDQgMjIuODQ4QzM5LjQ5OTQgMjIuODQzMSAzOS40OTQ0IDIyLjgzODEgMzkuNDk0NCAyMi44MzgxQzM5LjQyNDUgMjIuNzY0MiAzOS4zNTQ3IDIyLjY5MDMgMzkuMjg0OCAyMi42MTE0TDM5LjI3OTggMjIuNjA2NUMzOS4yNDk5IDIyLjU3MiAzOS4yMTk5IDIyLjUzMjYgMzkuMTg1IDIyLjQ5ODFDMzkuMTggMjIuNDkzMSAzOS4xOCAyMi40ODgyIDM5LjE3NSAyMi40ODgyQzM5LjA4MDIgMjIuMzY5OSAzOC45OTA0IDIyLjI0NjcgMzguOTAwNSAyMi4xMTg2QzM4Ljg5NTYgMjIuMTEzNyAzOC44OTU1IDIyLjEwODcgMzguODkwNiAyMi4xMDM4QzM4Ljg2MDYgMjIuMDY0NCAzOC44MzU3IDIyLjAyIDM4LjgxMDcgMjEuOTc1N0MzOC4zMzY2IDIxLjIxNjcgMzguMDYyMSAyMC4zMTk3IDM4LjA2MjEgMTkuMzU4N0MzOC4wNjIxIDE5LjE1MTcgMzguMDc3MSAxOC45NDQ3IDM4LjEwMjEgMTguNzQyNkMzOC4xMjIgMTguNzQ3NiAzOC4xNDIgMTguNzUyNSAzOC4xNjIgMTguNzU3NEMzOC4xNzY5IDE4Ljc2MjQgMzguMTkxOSAxOC43NjczIDM4LjIwNjkgMTguNzY3M0MzOC4yNDE4IDE4Ljc3NzEgMzguMjgxNyAxOC43ODcgMzguMzE2NyAxOC43OTY5QzM4LjMyNjYgMTguODAxOCAzOC4zNDE2IDE4LjgwMTggMzguMzUxNiAxOC44MDY3QzM4LjQwMTUgMTguODIxNSAzOC40NDY0IDE4LjgzNjMgMzguNDk2MyAxOC44NTExQzM4LjUwMTMgMTguODUxMSAzOC41MDEzIDE4Ljg1MTEgMzguNTA2MyAxOC44NTZDMzguNTUxMiAxOC44NzA4IDM4LjU5NjEgMTguODg1NiAzOC42MzYxIDE4LjkwMDRDMzguNjQ2IDE4LjkwNTMgMzguNjYxIDE4LjkxMDIgMzguNjcxIDE4LjkxNTFDMzguNzA1OSAxOC45Mjk5IDM4Ljc0MDggMTguOTQ0NyAzOC43NzU4IDE4Ljk1NDZDMzguNzg1OCAxOC45NTk1IDM4LjgwMDcgMTguOTY0NCAzOC44MTA3IDE4Ljk2OTRDMzguOTAwNSAxOS4wMDg4IDM4Ljk5NTQgMTkuMDQ4MiAzOS4wODAyIDE5LjA5MjZDMzkuMDkwMiAxOS4wOTc1IDM5LjEwMDIgMTkuMTAyNCAzOS4xMDUxIDE5LjEwNzNDMzkuMTQwMSAxOS4xMjcxIDM5LjE3NSAxOS4xNDE4IDM5LjIxNDkgMTkuMTYxNkMzOS4yMjQ5IDE5LjE2NjUgMzkuMjM0OSAxOS4xNzE0IDM5LjI0NDkgMTkuMTc2M0MzOS4yODQ4IDE5LjE5NjEgMzkuMzI0NyAxOS4yMjA3IDM5LjM2OTYgMTkuMjQ1M0MzOS4zNjk2IDE5LjI0NTMgMzkuMzc0NiAxOS4yNDUzIDM5LjM3NDYgMTkuMjUwM0MzOS40MTk1IDE5LjI3NDkgMzkuNDY0NSAxOS4yOTk2IDM5LjUwNDQgMTkuMzI5MUMzOS41MDk0IDE5LjMzNDEgMzkuNTE0NCAxOS4zMzQxIDM5LjUxOTQgMTkuMzM5QzM5LjU1OTMgMTkuMzU4NyAzOS41OTkyIDE5LjM4MzMgMzkuNjM0MSAxOS40MDNaTTMxLjgwNDEgMjMuNTkyMkMzMS44MDQxIDIyLjYzNjEgMzIuMDc4NiAyMS43MzkxIDMyLjU1MjcgMjAuOTc1MkMzMi41Nzc2IDIwLjkzMDggMzIuNjA3NiAyMC44OTE0IDMyLjYzMjUgMjAuODQ3MUMzMi42Mzc1IDIwLjg0MjEgMzIuNjM3NSAyMC44MzcyIDMyLjY0MjUgMjAuODMyM0MzMi43Mjc0IDIwLjcwNDEgMzIuODE3MiAyMC41ODA5IDMyLjkxNyAyMC40NjI3QzMyLjkyMiAyMC40NTc3IDMyLjkyMiAyMC40NTI4IDMyLjkyNyAyMC40NTI4QzMyLjk1NjkgMjAuNDEzNCAzMi45ODY5IDIwLjM3ODkgMzMuMDIxOCAyMC4zNDQ0TDMzLjAyNjggMjAuMzM5NEMzMy4wOTE3IDIwLjI2MDYgMzMuMTYxNSAyMC4xODY3IDMzLjIzNjQgMjAuMTEyN0MzMy4yNDE0IDIwLjEwNzggMzMuMjQxNCAyMC4xMDc4IDMzLjI0NjQgMjAuMTAyOUMzMy4yNzYzIDIwLjA2ODQgMzMuMzExMiAyMC4wMzg4IDMzLjM0NjIgMjAuMDA0M0MzMy4zNTEyIDE5Ljk5OTQgMzMuMzU2MiAxOS45OTQ1IDMzLjM1NjIgMTkuOTk0NUMzMy40MzEgMTkuOTI1NSAzMy41MDU5IDE5Ljg1NjUgMzMuNTgwNyAxOS43OTI0QzMzLjU4NTcgMTkuNzg3NSAzMy41OTA3IDE5Ljc4NzUgMzMuNTkwNyAxOS43ODI1QzMzLjYyNTYgMTkuNzUzIDMzLjY2MDYgMTkuNzIzNCAzMy42OTU1IDE5LjY5ODhDMzMuNzAwNSAxOS42OTM4IDMzLjcwNTUgMTkuNjg4OSAzMy43MTU1IDE5LjY4NEMzMy43OTUzIDE5LjYxOTkgMzMuODc1MiAxOS41NjA4IDMzLjk2IDE5LjUwMTZDMzMuOTY1IDE5LjUwMTYgMzMuOTY1IDE5LjQ5NjcgMzMuOTcgMTkuNDk2N0MzNC4wMDQ5IDE5LjQ3MiAzNC4wNDQ4IDE5LjQ0NzQgMzQuMDc5OCAxOS40MjI4QzM0LjA4OTggMTkuNDE3OCAzNC4wOTQ3IDE5LjQxMjkgMzQuMTA0NyAxOS40MDhDMzQuMTM5NyAxOS4zODMzIDM0LjE3OTYgMTkuMzU4NyAzNC4yMTQ1IDE5LjMzOUMzNC4yMTk1IDE5LjMzNDEgMzQuMjI0NSAxOS4zMzQxIDM0LjIyOTUgMTkuMzI5MUMzNC4yNzQ0IDE5LjMwNDUgMzQuMzE5MyAxOS4yNzQ5IDM0LjM1OTIgMTkuMjUwM0MzNC4zNTkyIDE5LjI1MDMgMzQuMzY0MiAxOS4yNTAzIDM0LjM2NDIgMTkuMjQ1M0MzNC40MDQxIDE5LjIyMDcgMzQuNDQ0MSAxOS4yMDEgMzQuNDg5IDE5LjE3NjNDMzQuNDk5IDE5LjE3MTQgMzQuNTA4OSAxOS4xNjY1IDM0LjUxODkgMTkuMTYxNkMzNC41NTM5IDE5LjE0MTggMzQuNTg4OCAxOS4xMjcxIDM0LjYyMzcgMTkuMTA3M0MzNC42MjM3IDE5LjE5MTEgMzQuNjE4NyAxOS4yNzQ5IDM0LjYxODcgMTkuMzUzOEMzNC42MTg3IDIyLjQ0MzkgMzYuMzA1NSAyNS4xMzk3IDM4LjgxNTcgMjYuNjAzNEMzOS4wNTAzIDI2Ljc0MTQgMzkuMjk0OCAyNi44Njk2IDM5LjU0NDMgMjYuOTgyOUMzOS41NDQzIDI2Ljk4MjkgMzkuNTQ5MyAyNi45ODI5IDM5LjU0OTMgMjYuOTg3OEMzOS43MTQgMjcuMDYxOCAzOS44ODM3IDI3LjEzNTcgNDAuMDU4MyAyNy4xOTk4SDQwLjA2MzNDNDAuMTM4MiAyNy4yMjkzIDQwLjIwOCAyNy4yNTQgNDAuMjgyOSAyNy4yNzg2QzM5LjM4NDYgMjguMDkxOCAzOC4xODE5IDI4LjU4NDYgMzYuODY5NCAyOC41ODQ2QzM0LjA2OTggMjguNTk0NSAzMS44MDQxIDI2LjM1NyAzMS44MDQxIDIzLjU5MjJaTTQ3LjQ0OTIgMjEuOTc1N0M0Ny40MjQyIDIyLjAyIDQ3LjM5NDMgMjIuMDU5NCA0Ny4zNjkzIDIyLjEwMzhDNDcuMzY0MyAyMi4xMDg3IDQ3LjM2NDMgMjIuMTEzNyA0Ny4zNTk0IDIyLjExODZDNDcuMjc0NSAyMi4yNDY3IDQ3LjE4NDcgMjIuMzY5OSA0Ny4wODQ5IDIyLjQ4ODJDNDcuMDc5OSAyMi40OTMxIDQ3LjA3OTkgMjIuNDk4MSA0Ny4wNzQ5IDIyLjQ5ODFDNDcuMDQ1IDIyLjUzNzUgNDcuMDE1IDIyLjU3MiA0Ni45ODAxIDIyLjYwNjVMNDYuOTc1MSAyMi42MTE0QzQ2LjkxMDIgMjIuNjkwMyA0Ni44NDAzIDIyLjc2NDIgNDYuNzY1NSAyMi44MzgxQzQ2Ljc2MDUgMjIuODQzMSA0Ni43NjA1IDIyLjg0OCA0Ni43NTU1IDIyLjg0OEM0Ni43MjU2IDIyLjg4MjUgNDYuNjkwNiAyMi45MTIxIDQ2LjY1NTcgMjIuOTQ2NkM0Ni42NTA3IDIyLjk1MTUgNDYuNjQ1NyAyMi45NTY0IDQ2LjY0NTcgMjIuOTU2NEM0Ni41NzA5IDIzLjAyNTQgNDYuNDk2IDIzLjA5NDQgNDYuNDIxMiAyMy4xNTg1QzQ2LjQxNjIgMjMuMTYzNCA0Ni40MTEyIDIzLjE2MzQgNDYuNDExMiAyMy4xNjgzQzQ2LjM3NjIgMjMuMTk3OSA0Ni4zNDEzIDIzLjIyNzUgNDYuMzA2NCAyMy4yNTIxQzQ2LjMwMTQgMjMuMjU3IDQ2LjI5NjQgMjMuMjYyIDQ2LjI4NjQgMjMuMjY2OUM0Ni4yMDY2IDIzLjMzMSA0Ni4xMjY3IDIzLjM5MDEgNDYuMDQxOSAyMy40NDkzQzQ2LjAzNjkgMjMuNDQ5MyA0Ni4wMzY5IDIzLjQ1NDIgNDYuMDMxOSAyMy40NTQyQzQ1Ljk5NyAyMy40Nzg4IDQ1Ljk1NyAyMy41MDM1IDQ1LjkyMjEgMjMuNTI4MUM0NS45MTIxIDIzLjUzMyA0NS45MDcxIDIzLjUzOCA0NS44OTcyIDIzLjU0MjlDNDUuODYyMiAyMy41Njc1IDQ1LjgyMjMgMjMuNTkyMiA0NS43ODc0IDIzLjYxMTlDNDUuNzgyNCAyMy42MTY4IDQ1Ljc3NzQgMjMuNjE2OCA0NS43NzI0IDIzLjYyMTdDNDUuNzI3NSAyMy42NDY0IDQ1LjY4MjYgMjMuNjc2IDQ1LjY0MjYgMjMuNzAwNkM0NS42NDI2IDIzLjcwMDYgNDUuNjM3NiAyMy43MDA2IDQ1LjYzNzYgMjMuNzA1NUM0NS41OTc3IDIzLjczMDIgNDUuNTU3OCAyMy43NDk5IDQ1LjUxMjkgMjMuNzc0NUM0NS41MDI5IDIzLjc3OTUgNDUuNDkyOSAyMy43ODQ0IDQ1LjQ4MjkgMjMuNzg5M0M0NS40NDggMjMuODA5IDQ1LjQxMzEgMjMuODIzOCA0NS4zNzgxIDIzLjg0MzVDNDUuMzc4MSAyMy43NTk3IDQ1LjM4MzEgMjMuNjc2IDQ1LjM4MzEgMjMuNTk3MUM0NS4zODMxIDIwLjUwNyA0My42OTY0IDE3LjgxMTIgNDEuMTg2MiAxNi4zNDc1QzQwLjk1MTYgMTYuMjA5NSA0MC43MDcxIDE2LjA4MTMgNDAuNDU3NiAxNS45NjhDNDAuNDU3NiAxNS45NjggNDAuNDUyNiAxNS45NjggNDAuNDUyNiAxNS45NjNDNDAuMjg3OSAxNS44ODkxIDQwLjExODIgMTUuODE1MiAzOS45NDM1IDE1Ljc1MTFIMzkuOTM4NkMzOS44NjM3IDE1LjcyMTUgMzkuNzkzOCAxNS42OTY5IDM5LjcxOSAxNS42NzIzQzQwLjYxNzMgMTQuODU5MSA0MS44MiAxNC4zNjYyIDQzLjEzMjQgMTQuMzY2MkM0NS45MjcxIDE0LjM2NjIgNDguMTk3NyAxNi42MDM3IDQ4LjE5NzcgMTkuMzY4NkM0OC4xOTI4IDIwLjMxOTcgNDcuOTIzMyAyMS4yMTE4IDQ3LjQ0OTIgMjEuOTc1N1pNNjYuOTY2OCAyNi45OTI4QzYzLjc5NzkgMjYuOTkyOCA2MS4yMjc4IDI0LjQ1NDYgNjEuMjI3OCAyMS4zMjUxQzYxLjIyNzggMTguMTk1NiA2My43OTc5IDE1LjY1NzUgNjYuOTY2OCAxNS42NTc1QzcwLjEzNTggMTUuNjU3NSA3Mi43MDU4IDE4LjE5NTYgNzIuNzA1OCAyMS4zMjUxQzcyLjcwNTggMjQuNDU0NiA3MC4xMzU4IDI2Ljk5MjggNjYuOTY2OCAyNi45OTI4WiIgc3R5bGU9ImZpbGw6IHJnYig2MywgMjA3LCAxMzApOyIvPgo8L3N2Zz4="
                            width="79"
                            height="32" />

                        <h3 class="mt-4 text-gray-900 text-sm font-medium">
                            Moola
                        </h3>

                        <dl
                            class="mt-1 flex-grow flex flex-col justify-between">
                            <dd class="text-gray-500 text-sm">
                                Lending and Borrowing
                            </dd>
                        </dl>
                        <dd class="mt-3">
                            <span
                                class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                                >Lending</span>
                            <span
                                class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                                >Borrowing</span>
                        </dd>
                    </div>
                    <div>
                        <div class="-mt-px flex divide-x divide-gray-200">
                            <div class="w-0 flex-1 flex">
                                <a
                                    href="https://moola.market/"
                                    target="_blank"
                                    class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="ml-3">Website</span>
                                </a>
                            </div>
                            <div class="-ml-px w-0 flex-1 flex">
                                <a
                                    href="/"
                                    class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="ml-3">Explore</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li
                    class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                    <div class="flex-1 flex flex-col p-4">
                        <svg
                            class="w-32 h-32 flex-shrink-0 mx-auto text-blue-500"
                            fill="#2362FB"
                            viewBox="0 0 146 48"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                                d="M58.34 7.34h3v15h-3zm67.71 14.48a8 8 0 004 1 7.56 7.56 0 004.74-1.5 6.17 6.17 0 002.37-4v-.2h-3.12v.13a3.21 3.21 0 01-1.37 2A4.56 4.56 0 01130 20a4.16 4.16 0 01-3.31-1.39 5.57 5.57 0 01-1.21-3.74 5.49 5.49 0 011.25-3.8A4.2 4.2 0 01130 9.72a4.59 4.59 0 012.67.75 3.3 3.3 0 011.39 2v.13h3.11v-.2a6 6 0 00-2.35-4A7.66 7.66 0 00130 6.93a7.85 7.85 0 00-4 1 7 7 0 00-2.7 2.79 8.61 8.61 0 00-1 4.14 8.68 8.68 0 001 4.15 6.83 6.83 0 002.75 2.81zM59.85 4.68A2 2 0 0061.42 4 2.21 2.21 0 0062 2.47 2 2 0 0061.41 1a2.26 2.26 0 00-3.1 0 2.08 2.08 0 00-.63 1.52A2.19 2.19 0 0058.31 4a2.15 2.15 0 001.54.68zm22.89 17.7h3v-9.9a5.6 5.6 0 00-1.48-4.14 5.24 5.24 0 00-3.84-1.46 5.41 5.41 0 00-2.93.8 4.83 4.83 0 00-1.73 1.92 4.61 4.61 0 00-1.69-1.89 5.38 5.38 0 00-3-.83 5.19 5.19 0 00-2.55.64A4.57 4.57 0 0067 8.87l-.16-1.55h-2.75v15.06h3.06v-9.2a3.79 3.79 0 01.85-2.52 3 3 0 012.35-1 2.79 2.79 0 012.24.91 3.77 3.77 0 01.8 2.54v9.3h3v-9.2a3.73 3.73 0 01.89-2.54 3 3 0 012.41-1 2.86 2.86 0 012.19.84 3.76 3.76 0 01.79 2.62zm8.53 6.53h-3V7.35h2.56L91 9.58a5.6 5.6 0 012-1.81 6.87 6.87 0 019.63 2.94 9 9 0 01.91 4.15 9 9 0 01-.91 4.11 6.78 6.78 0 01-2.55 2.81 7.08 7.08 0 01-3.7 1 7.25 7.25 0 01-3.24-.7 5.37 5.37 0 01-1.91-1.53zm.21-14a5.27 5.27 0 001.23 3.67A4.16 4.16 0 0096 20a4.21 4.21 0 003.3-1.4 5.39 5.39 0 001.25-3.69 5.34 5.34 0 00-1.25-3.71 4.56 4.56 0 00-6.54 0 5.57 5.57 0 00-1.28 3.74zM74.63 31.8a5.45 5.45 0 00-2.94.8A4.74 4.74 0 0070 34.52a4.68 4.68 0 00-1.69-1.89 5.38 5.38 0 00-3-.83 5.26 5.26 0 00-2.55.63 4.6 4.6 0 00-1.55 1.36L61 32.24h-2.72v15h3.06v-9.2a3.75 3.75 0 01.89-2.51 3 3 0 012.35-1 2.81 2.81 0 012.24.91 3.72 3.72 0 01.8 2.54v9.3h3v-9.16a3.73 3.73 0 01.89-2.54 3 3 0 012.42-1 2.87 2.87 0 012.19.84 3.75 3.75 0 01.82 2.58v9.3h3v-9.9a5.59 5.59 0 00-1.48-4.14 5.3 5.3 0 00-3.83-1.46zm20.15.44h2.57v15h-2.89v-2.15a5.8 5.8 0 01-2 1.73 7.13 7.13 0 01-3.44.85 6.83 6.83 0 01-3.65-1 6.67 6.67 0 01-2.48-2.78 10 10 0 010-8.29 6.78 6.78 0 012.55-2.81 7.55 7.55 0 017-.23 5.72 5.72 0 012 1.72zm-.54 7.42A5.2 5.2 0 0093 36a4.62 4.62 0 00-6.58 0 5.39 5.39 0 00-1.23 3.69 5.42 5.42 0 001.23 3.68 4.11 4.11 0 003.25 1.4A4.29 4.29 0 0093 43.42a5.4 5.4 0 001.24-3.76zm18-16.87a6.8 6.8 0 01-3.64-1 6.63 6.63 0 01-2.53-2.79 10 10 0 010-8.28 6.88 6.88 0 012.55-2.82 7.54 7.54 0 017.06-.22 5.75 5.75 0 012 1.71l.21-2h2.58v15h-2.9v-2.18a5.52 5.52 0 01-2 1.73 7.13 7.13 0 01-3.37.85zm-2.66-4.25a4.09 4.09 0 003.25 1.39 4.28 4.28 0 003.32-1.39 5.44 5.44 0 001.26-3.76 5.27 5.27 0 00-1.25-3.66 4.25 4.25 0 00-3.27-1.36 4.2 4.2 0 00-3.31 1.39 5.4 5.4 0 00-1.24 3.69 5.42 5.42 0 001.2 3.7zM146 10V7.34h-3.57V3.57h-.56l-4.61 5.49V10h2.19v7.4a10.54 10.54 0 00.24 2.31 3.58 3.58 0 001.27 1.95 4.8 4.8 0 003.12.87 10.09 10.09 0 001.82-.16h.14V19.7h-.16a3.27 3.27 0 00-.44 0 3.67 3.67 0 01-.66.05 2.28 2.28 0 01-1.79-.57 2.85 2.85 0 01-.51-1.86V10zm-39.38 22.11a4.63 4.63 0 00-2.44.63A3.17 3.17 0 00103 34l-.26-1.77H100v15h3.06v-8.06a4.59 4.59 0 011-3.17 3.72 3.72 0 012.9-1.13 5.6 5.6 0 011 .06h.19v-2.7h-.13a7.47 7.47 0 00-1.4-.12zm15.94.12h-3.81l-6.41 6.84v-13.5h-3.06v21.69h3.06V43l2.66-2.84 3.71 7 .05.09h3.44l-5-9.36zm11.07 10.29h3v.21a5.81 5.81 0 01-2.46 3.58 7.79 7.79 0 01-4.54 1.35 7.61 7.61 0 01-4-1 7 7 0 01-2.66-2.81 9.06 9.06 0 01-.94-4.15 8.87 8.87 0 011-4.14 6.83 6.83 0 012.65-2.78 7.63 7.63 0 013.84-1 7.38 7.38 0 013.7.91 6.44 6.44 0 012.49 2.53 7.51 7.51 0 01.89 3.69 8.11 8.11 0 01-.13 1.71v.14h-11.42a4.29 4.29 0 004.51 4.24 4.81 4.81 0 002.54-.65 3.44 3.44 0 001.49-1.76zm-8.55-4.09h8.37a4.14 4.14 0 00-1.13-2.84 3.9 3.9 0 00-2.89-1.11 4.4 4.4 0 00-3.1 1.12 4 4 0 00-1.25 2.83zm17.11-10h-.57L137 34v.87h2.19v7.42a11.18 11.18 0 00.24 2.31 3.58 3.58 0 001.27 1.95 4.82 4.82 0 003.12.87 10 10 0 001.82-.16h.14v-2.67h-.16a3.29 3.29 0 00-.44 0 4.89 4.89 0 01-.66 0 2.25 2.25 0 01-1.79-.58 2.82 2.82 0 01-.51-1.85v-7.29h3.57v-2.64h-3.57zm-99.3-19.9l-.38.3.39-.31A24.12 24.12 0 0030.22 0l-.14.48.14-.48a.87.87 0 00-.93.35l-.9 1.3a.87.87 0 000 .94l.42-.26-.42.25a5.3 5.3 0 01-.95 6.66.9.9 0 00-.27.8l.28 1.5.49-.09-.47.08a.84.84 0 00.56.65 12.05 12.05 0 017.83 11.42 11.843 11.843 0 01-23.68.52h-.5.5a12 12 0 017.87-11.88.88.88 0 00.56-.66l.27-1.5a.86.86 0 00-.27-.8 5.3 5.3 0 01-.95-6.66.85.85 0 000-.94l-.92-1.3a.84.84 0 00-.93-.38l.13.48-.13-.48A24.4 24.4 0 00.21 26.78 24.13 24.13 0 0024 48a24 24 0 0021.6-13.74 24.72 24.72 0 00-2.71-25.73zm1.93 15.07a21.13 21.13 0 01-14.63 20.22 20.65 20.65 0 01-23.32-8.21 21.45 21.45 0 01.79-25.09 21 21 0 018.11-6.34A8.58 8.58 0 0017.08 10 15.32 15.32 0 009 23.6a15.19 15.19 0 0015 15.29A15.19 15.19 0 0039.06 23.6 15.3 15.3 0 0030.94 10a8.53 8.53 0 001.31-5.86 21 21 0 018.12 6.34 21.13 21.13 0 014.45 13.12z" /></svg>
                        <h3 class="mt-4 text-gray-900 text-sm font-medium">
                            Impact Market
                        </h3>
                        <dl
                            class="mt-1 flex-grow flex flex-col justify-between">
                            <dd class="text-gray-500 text-sm">
                                Community Empowerment and Charity
                            </dd>
                        </dl>
                        <dd class="mt-3">
                            <span
                                class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                                >Community</span>
                            <span
                                class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                                >Charity</span>
                        </dd>
                    </div>
                    <div>
                        <div class="-mt-px flex divide-x divide-gray-200">
                            <div class="w-0 flex-1 flex">
                                <a
                                    href="https://www.impactmarket.com/"
                                    target="_blank"
                                    class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="ml-3">Website</span>
                                </a>
                            </div>
                            <div class="-ml-px w-0 flex-1 flex">
                                <a
                                    href="/"
                                    class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="ml-3">Explore</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</EmptyLayout>
