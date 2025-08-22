FROM php:8.1-apache

# Instalar extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libpq-dev \
    curl \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

# Habilitar módulos Apache
RUN a2enmod rewrite headers

# Configurar Apache
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Copiar código da aplicação
COPY . /var/www/html/

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar dependências
WORKDIR /var/www/html
RUN composer install --no-dev --optimize-autoloader

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expor porta
EXPOSE 80

# Comando padrão
CMD ["apache2-foreground"]
