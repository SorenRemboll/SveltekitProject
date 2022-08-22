<script>
    import { session } from '$app/stores'
</script>

<div class=" mx-auto w-4/5 flex justify-center items-center flex-col">
    <i class="fas fa-ghost text-6xl my-10"></i>
    <nav>
        <ul class="flex items-center gap-10">
            <a href="/">Home</a>
            <a href="/pokedex">Pokedex</a>
            <a href="/faq">FAQ</a>
            {#if Object.keys($session).length !== 0}
                 <a href="/dashboard"> Your dashboard</a>
                 <a href="/logout" on:click|preventDefault= {async()=>{
                    await fetch('/logout');
                    window.location = '/'
                 }}>Logout</a>
            {:else}
                <a href="/user">Login</a>
            {/if}
            
        </ul>
    </nav>
</div>