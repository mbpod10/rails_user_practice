# User Authentication

---

Create User authentication using rails

---

NOTE:
API IS ON PORT 3000
REACT APP ON PORT 3001

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

## Create Models

- Create User model that includes email and password_digest for bcrypt

```
rails g user email password_digest
```

run `rails db:migrate`

- Create Information Model that will have a relationship with user

```
rails g scaffold information name citizen:boolean age:integer marital_status address dependent:boolean
```

run `rails db:migrate`

```
rails g migration AddForeignKeyToInformation
```

- Add user_id as a key to create relationship between information and user

```
class AddForeignKeyToInformation < ActiveRecord::Migration[6.0]
  def change
    add_column :information, :user_id, :integer
  end
end

```

- Insert Some Seed Data

```
User.create([
    {email: "mb@gmail.com", password: "101010", password_confirmation: "101010" },
    {email: "z", password: "101010", password_confirmation: "101010" }
])
Information.create([
    {name: "Ckorb", citizen:true, age: 25,
    marital_status: "single", address: "no", dependent: false,
    user_id: 1 }
])

puts "Seed Created"
```

run `rails db:seed` to populate database

## Create User Routes To Show Relationship Between User and Information

- in `routes.db` create the following routes

```
resources :information
resources :users, only: [:index, :show]
```

the `only: [:index, :show]` will only allow the api to show all the users and an individual user

- in `app/controllers/` create `users_controller.rb` file
  Make sure to include `.to_json(include: :information)` to show relationship

  ```
  class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users.to_json(include: :information)
    end

    def show
        @user = User.find(params[:id])
        render json: @user.to_json(include: :information)
    end
  end
  ```

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

```
