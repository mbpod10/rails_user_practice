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


# User.where(email: params['user']['email'])
# User.where(email: "z")