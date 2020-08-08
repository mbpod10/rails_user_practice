# User Authentication

---

Create User authentication using rails

---

```
rails new authentication_app -d postgresql --skip-git
```

skip `-api` flag so you can properly use session for user authentication. This will create
a standard MVC app, but not use any of the views, it's going to be treated as API only.

- Create DataBase

```
rails db:create
```

- Install [bcrypt](https://rubygems.org/gems/bcrypt) from rubygems and cors in gem file

```
gem 'bcrypt', '~> 3.1', '>= 3.1.15'
gem "rack-cors", :require => 'rack/cors'
```

run `bundle` to install cors and brycrpt
