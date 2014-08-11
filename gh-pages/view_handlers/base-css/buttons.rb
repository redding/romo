require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::BaseCSS; end
class ViewHandlers::BaseCSS

  class Buttons
    include ViewHandlers::Layouts::Docs

    page_title{ 'Buttons CSS' }

    def run!
      render 'base-css/buttons.html'
    end

  end

end
