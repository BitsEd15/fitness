<script setup>

</script>

<template>
    <div class="g-container--footer">
        <div class="footer">
            <div class="footer__general-info">
                <div class="footer__general-info-telega">
                    <img src="/telegram-icon-telegram-social-media-logo-free-png.webp" alt="">
                    <a href="https://t.me/gdz75" rel="noopener noreferrer">Telegram</a>
                </div>
                <div class="footer__general-info-standart">
                    <a href="tel:+79001234567" rel="noopener noreferrer"target="_blank">+7 900 123-45-67 </a> |
                    <a href="mailto:azhkenazijew@mail.ru" target="_blank">azhkenazijew@mail.ru</a>
                </div>
            </div>
            <div class="footer__copyright">
                <div class="footer__copyright-icons">
                    <a href="https://instagram.com/твой_ник" target="_blank" rel="noopener noreferrer">
                        <img src="/public/vectors/Platform=Instagram, Color=Negative.svg" alt="instagram">
                    </a>
                    <a href="https://wa.me/79001234567" target="_blank" rel="noopener noreferrer">
                        <img src="/public/vectors/Platform=WhatsApp, Color=Negative.svg" alt="whatsapp">
                    </a>
                    <a href="https://vk.com/твой_ник" target="_blank" rel="noopener noreferrer">
                        <img src="/public/vectors/Platform=VK, Color=Negative.svg" alt="vk">
                    </a>
                    <a href="https://youtube.com/@твой_канал" target="_blank" rel="noopener noreferrer">
                        <img src="/public/vectors/Platform=YouTube, Color=Negative.svg" alt="youtube">
                    </a>
                </div>
                <p>© 2026 FIT PRO. Все права защищены.</p>
            </div>
        </div>
    </div>
</template>

<style>
.g-container--footer {
    margin-top: 32px;
    width: 100%;
    background-color: var(--header-background);
}

.footer {
    margin: 0 auto;
    max-width: 407px;
    padding: 8px 16px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
}

.footer__general-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.footer__general-info-telega {
    display: flex;
    justify-content: center;
    gap: 6px;
    align-items: center;

    img {
        width: 32px;
        height: 35px;
    }

    a {
        all: unset;
        cursor: pointer;
        transition: 0.3s all ease;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 13px;
        color: var(--grey-text);
    }

    a:hover {
        color: var(--button-color);
    }
}

.footer__general-info-standart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    color: var(--grey-text);

    a {
        all: unset;
        cursor: pointer;
        transition: 0.3s all ease;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 13px;
        color: var(--grey-text);
    }

    a:hover {
        color: var(--button-color);
    }
}

.footer__copyright {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 12px;
        color: #636366;
    }
}

.footer__copyright-icons {
    display: flex;
    align-items: center;
    gap: 16px;

    img {
        width: 20px;
        height: 20px;
    }
}

@media(min-width: 768px) {
    .footer {
        max-width: 832px;
        width: 100%;
        padding: 16px 32px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
    }

    .footer__general-info {
        align-items: flex-start;
        /* Прижимаем левый блок к левому краю */
    }

    .footer__copyright {
        align-items: flex-end;
        /* Прижимаем правый блок к правому краю */
        text-align: right;
    }
}

@media(min-width: 1440px) {
    .footer {
        max-width: 1600px;
        width: 100%;
        padding: 16px 80px;
    }
}
</style>