<template>
    <LayoutModal @close="modalStore.toggleRegisterModal">
        <template v-slot:header>
            <h2 class="text-white text-3xl font-bold">Create an account</h2>
            <h3 class="text-placeholder">Start your journey!</h3>
        </template>

        <template v-slot:body>
            <Form class="flex flex-col gap-4 w-full" @submit="registerUser">
                <InputField name="name" label="Name" placeholder="At least 3 & max.15 lower case characters"
                    rules="required|min:3|max:15|lowercase" />
                <InputField name="email" label="Email" placeholder="Enter your email" rules="required|email" />
                <InputField name="password" label="Password" placeholder="At least 8 & max.15 lower case characters"
                    textType="password" rules="required|min:8|max:15|lowercase" />
                <InputField name="password_confirm" label="Confirm Password" placeholder="Confirm your password"
                    textType="password" rules="required|confirmed:@password" />
                <ButtoneRed text="Get started" type="submit" />
                <ButtonDark text="Sign up with Google" :gmail="true" />
            </Form>
        </template>
        <template v-slot:footer>
            <div class="flex gap-1 mx-auto">
                <p class="text-placeholder">Already have an account?</p>
                <span class="underline text-my-blue cursor-pointer" @click="modalStore.switchLoginRegisterModal">Log
                    in</span>
            </div>
        </template>
    </LayoutModal>
</template>
  

<script setup>
import LayoutModal from '@/components/layouts/LayoutModal.vue';
import { Form } from 'vee-validate';
import { useModalStore } from '@/stores/useModalStore.js';
import InputField from '@/components/ui/InputField.vue';
import ButtoneRed from '@/components/ui/ButtonRed.vue';
import ButtonDark from '@/components/ui/ButtonDark.vue';

const modalStore = useModalStore();


const registerUser = () => {
    console.log('register user');
}
</script>