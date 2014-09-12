require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Forms
    include ViewHandlers::Layouts::Docs

    page_title{ 'Forms | CSS' }

    def run!
      render 'css/forms.html'
    end

  end

end
