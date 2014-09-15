require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Images
    include ViewHandlers::Helpers::CSSHandler

    script 'js/holder.js'
    page_title{ 'Images' }

    def run!
      render 'css/images.html'
    end

  end

end
