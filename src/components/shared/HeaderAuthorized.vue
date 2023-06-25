<template>
    <nav class="bg-header h-86">
        <header class="flex flex-row justify-between mx-16 pt-6">
            <p class="text-header my-auto" @click="router.push({ name: 'home' })">MOVIE QUOTES</p>
            <div class="flex flex-row gap-4">
                <IconNotificationBell class="my-auto" />
                <IconNotificationEclipse class="absolute ml-3 mb-4" />
                <p class="absolute ml-5 pt-[1px] text-white">3</p>
                <LanguageDropDown />
                <ButtonDark :text="$t('auth.log_out')" @click="logOut()" />
            </div>
        </header>
    </nav>
</template>

<script setup>
import ButtonDark from '@/components/ui/ButtonDark.vue';
import IconNotificationBell from '@/components/icons/header/IconNotificationBell.vue';
import LanguageDropDown from '@/components/shared/LanguageDropDown.vue';
import IconNotificationEclipse from '@/components/icons/header/IconNotificationEclipse.vue';
import { logout } from '@/services/auth/auth';
import sanctum from '@/plugins/axios/sanctum.js';
import { useAuthStore } from '@/stores/useAuthStore';
import router from '@/router/index.js';


async function logOut() {
    useAuthStore().setIsAuthenticated(false);
    await sanctum.get('/sanctum/csrf-cookie').then(() => {
        logout().then(() => {
            router.push({ name: 'home' });
        });

    });
}
</script>