# User Authentication

---

Create User authentication using rails

---

```
rails new authentication_app -d postgresql --skip-git
```

skip `-api` flag so you can properly use session for user authentication. This will create
a standard MVC app, but not use any of the views, it's going to be treated as API only.

THIS WILL GIVE YOU ACCESS TO SESSIONS COOKIES

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

```
rails g scaffold information name citizen:boolean age:integer marital_status address dependent:boolean
```

```
rails g migration AddForeignKeyToInformation
```

```
class AddForeignKeyToInformation < ActiveRecord::Migration[6.0]
  def change
    add_column :information, :user_id, :integer
  end
end

```

```
Information.create([
    {"name": "Brock Podgurski", "citizen":true, "age": 25,
    "marital_status": "single", "address": "no", "dependent": false,
    "user_id": 1 }
])
```

change user concern so user infomation table is sent to client
as_json NOT to_json

```
module CurrentUserConcern
    extend ActiveSupport::Concern
    included do
        before_action :set_current_user
    end

    def set_current_user
        if session[:user_id]
         @current_user = User.find(session[:user_id]).as_json(include: :information)
        end
    end
end

```
