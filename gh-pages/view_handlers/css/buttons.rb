require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Buttons
    include ViewHandlers::Layouts::Docs

    page_title{ 'Buttons CSS' }

    def run!
      render 'css/buttons.html'
    end

  end

end
