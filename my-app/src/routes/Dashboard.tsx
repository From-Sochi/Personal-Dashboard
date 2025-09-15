import { useEffect } from 'react';
import {
    Config,
    OAuthList,
    Auth,
    WidgetEvents,
    OAuthListInternalEvents,
    ConfigResponseMode,
    ConfigSource,
    OAuthName
} from '@vkid/sdk';

interface AuthSuccessData {
    access_token: string;
    expires_in: number;
    user_id: number;
    email?: string;
    // другие поля ответа
}

interface LoginSuccessPayload {
    code: string;
    device_id: string;
}

function Dashboard() {
    useEffect(() => {
        // Инициализация конфигурации VK ID
        Config.init({
            app: 54140536, // Ваш ID приложения
            redirectUrl: 'https://from-sochi.github.io/STAR-WARS/', // Используем точный redirect URL из настроек VK
            responseMode: ConfigResponseMode.Callback,
            source: ConfigSource.LOWCODE,
            scope: 'email', // Запрашиваем email пользователя
        });

        const container = document.getElementById('vkid-container');
        if (!container) return;

        // Очищаем контейнер перед рендером
        container.innerHTML = '';

        const oAuth = new OAuthList();

        oAuth.render({
            container: container,
            oauthList: [OAuthName.VK], // Исправлено: используем OAuthName.VK вместо OAuthName.VKID
        })
            .on(WidgetEvents.ERROR, (error: any) => {
                console.error('Ошибка авторизации VK ID:', error);
                // Здесь можно добавить обработку ошибок для пользователя
            })
            .on(OAuthListInternalEvents.LOGIN_SUCCESS, (payload: LoginSuccessPayload) => {
                console.log('Получен код авторизации:', payload.code);

                // Обмен кода на access token
                Auth.exchangeCode(payload.code, payload.device_id)
                    .then((data: AuthSuccessData) => {
                        console.log('Успешная авторизация:', data);

                        // Сохраняем данные в localStorage
                        localStorage.setItem('vk_token', data.access_token);
                        localStorage.setItem('vk_user_id', data.user_id.toString());

                        if (data.email) {
                            localStorage.setItem('vk_email', data.email);
                        }

                        // Здесь можно перенаправить пользователя или обновить состояние приложения
                        alert('Авторизация прошла успешно!');

                    })
                    .catch((error: any) => {
                        console.error('Ошибка обмена кода на токен:', error);
                        alert('Ошибка авторизации: ' + error.message);
                    });
            });

        return () => {
            // Очистка при размонтировании компонента
            if (container) {
                container.innerHTML = '';
            }
        };
    }, []);

    return (
        <div style={{ padding: '20px', margin: 'auto', minWidth: '300px', maxWidth: '600px' }}>
            <h2>Вход через VK</h2>

            <div id="vkid-container"></div>

            <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                <p>App ID: 54140536</p>
                <p>Redirect URL: http://localhost/</p>
            </div>
        </div>
    );
}

export default Dashboard;