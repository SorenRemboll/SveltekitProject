<script>
    import { goto } from "$app/navigation";
    import Inputfield from "$lib/utilityComps/inputField.svelte";
    import UserNameField from "$lib/utilityComps/userNameField.svelte";
    import PasswordField from "$lib/utilityComps/passwordField.svelte";
    let readyToSend = false;
    let userNameValid = false;
    let userFNameValid = false;
    let userLNameValid = false;
    let userPasswordValid = false;
    $:{
        if (userNameValid && userFNameValid && userLNameValid && userPasswordValid) {
            readyToSend = true;
        }else{
            readyToSend = false;
        }
    }

    let userToCreate = {
        user_fName:'Søren',
        user_lName: 'Rembøll',
        user_name:'Soer145a!',
        user_password:'Sbx98hfg!'
    }
    
	const sendRegister = async () => {
        if (!readyToSend) {
            return
        }
        const conn = await fetch('/apis/auth/createUser',{
            method:'POST',
            body:JSON.stringify(userToCreate)
        });
        const data = await conn.json();
        if (data.redirect) {
            window.location.reload();
        }
        

    };
    const handler = (event) => {
        console.log(event.detail);
        switch (event.detail.label) {
            case 'Firstname':
                userFNameValid = event.detail.state == 'valid' ? true : false;
                if (userFNameValid) {
                    userToCreate.user_fName = event.detail.value
                }
                break;
            case 'Lastname':
                userLNameValid = event.detail.state == 'valid' ? true : false;
                if (userLNameValid) {
                    userToCreate.user_lName = event.detail.value
                }
                break;
            case 'Username':
                userNameValid = event.detail.state == 'valid' ? true : false;
                if (userNameValid) {
                    userToCreate.user_name = event.detail.value
                }
                break;
            case 'Password':
                userPasswordValid = event.detail.state == 'valid' ? true : false;
                if (userPasswordValid) {
                    userToCreate.user_password = event.detail.value
                }
                break;
        }
    }
</script>

<form class=" ml-4 flex flex-col gap-4 " on:submit|preventDefault={sendRegister}>
	<Inputfield on:valid={handler} label={'Firstname'} min={1} max={30} />
	<Inputfield on:valid={handler} label={'Lastname'} min={1} max={30} />
    <UserNameField on:valid={handler} label={'Username'} min={8} max={50} />
    <PasswordField on:valid={handler} label={'Password'} min={8} max={50} />
    {#if readyToSend}
        <button class=" border hover:border-green-300  transition duration-500 cursor-pointer px-4 py-2 w-40  border-slate-300 p-4 rounded-xl my-4 shadow-lg">Register!</button>
    {/if}
</form>

<style>
    
</style>