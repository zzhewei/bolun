FROM php:7.4.9-fpm-alpine

COPY php.ini $PHP_INI_DIR/conf.d/

# 安裝 php extensions 的神器，請務必一試！
# https://github.com/mlocati/docker-php-extension-installer
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/

RUN install-php-extensions gd pdo_mysql mysqli xdebug