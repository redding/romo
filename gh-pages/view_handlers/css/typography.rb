require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Typography
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Typography' }

    def run!
      render 'css/typography.html'
    end

  end

end
