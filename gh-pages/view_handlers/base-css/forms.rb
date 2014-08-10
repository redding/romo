require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::BaseCSS; end
class ViewHandlers::BaseCSS

  class Forms
    include ViewHandlers::Layouts::Docs

    page_title{ 'Forms | CSS' }

    def run!
      render 'base-css/forms.html'
    end

  end

end
