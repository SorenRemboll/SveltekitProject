
<script>
    let inputUserName = '';
	let inputPassword = '';
	let validated = false;

    const validateInput = (pass, usr) => {
		let usrPattern = /^[a-z0-9]{8,20}$/i;
		let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,30}$/;
		if (usrPattern.test(usr) && passPattern.test(pass)) {
			return true;
		} else {
			return false;
		}
	};
	const sendToLoginEP = async () => {
		const conn = await fetch('/apis/auth/login', {
			method: 'POST',
			body: JSON.stringify({ inputUserName, inputPassword })
		});
		const data = await conn.json();
		if (data.searchStatus) {
			window.location = '/dashboard';
		}
	};
    $: validated = validateInput(inputPassword, inputUserName);

</script>
<form class=" ml-4 flex flex-col gap-4 " on:submit|preventDefault={sendToLoginEP}>

<label for="" class="border border-slate-300 p-4 rounded-xl my-4 shadow-lg">
    <p>Username:</p>
    <input
        bind:value={inputUserName}
        name="username"
        autocomplete="off"
        class="px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
        type="text"
    />
</label>
<label for="" class="border border-slate-300 p-4 rounded-xl my-4 shadow-lg">
    <p>Password:</p>
    <input
    bind:value={inputPassword}

        name="password"
        class=" px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
        type="password"
    />
</label>
{#if validated}
    <input
        class=" border hover:border-green-300  transition duration-500 cursor-pointer px-4 py-2 w-40  border-slate-300 p-4 rounded-xl my-4 shadow-lg"
        type="submit"
        value="Login"
    />
{/if}
	</form>
