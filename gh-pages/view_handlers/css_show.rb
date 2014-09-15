require 'view_handlers/_helpers/css_handler'

module ViewHandlers

  class CSSShow
    include ViewHandlers::Helpers::CSSHandler

    def run!
      render 'css_show.html'
    end

  end

end
